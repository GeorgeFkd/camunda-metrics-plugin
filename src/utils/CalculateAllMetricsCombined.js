import { parse } from "xpath";
// import xpath from "xpath"
import { DOMParser as dom } from "xmldom";
import { BPMN_ELEMENTS } from "../assets/constants";
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

//watch out for GM
export default function CalculateAllMetricsOptimized(diagramXml) {
    if (!diagramXml) throw Error("The xml of the diagram was not supplied");
    const domparser = new dom();
    const xmlDoc = domparser.parseFromString(diagramXml);
    let mapWithComputedMetrics = new Map();

    //first i get the gates of the diagram they will be needed in many places
    // const gatewayevaluator = xpath.parse(
    //     "//*[ends-with(local-name(),'Gateway') and local-name()!='Bounds']"
    // );
    const gatewayevaluator = parse(
        "//*[ends-with(local-name(),'Gateway') and local-name()!='Bounds']"
    );
    const gatewaysXpathRes = gatewayevaluator.select({
        node: xmlDoc,
    });
    const tng = gatewaysXpathRes.length;
    mapWithComputedMetrics.set("TNG", tng);
    const gatewayTypes = removeDuplicates(
        gatewaysXpathRes.map((node) => {
            //this has to be more sophisticated but will do for now
            return node.localName;
        })
    );
    // );
    //this should be only for: and xor or
    const mapForGM = new Map();
    gatewayTypes.forEach((type) => mapForGM.set(type, 0));
    const gateFreq = new Map();
    gatewayTypes.forEach((type) => gateFreq.set(type, 0));
    let TS = 0;
    let sumForAGD = 0;
    let currentMGD = -1;
    let sumForNSFG = 0;
    let sumForCFC = 0;
    for (let node of gatewaysXpathRes) {
        // const evaluateOutGoing = xpath.parse("./*[local-name()='outgoing']");
        const evaluateOutGoing = parse("./*[local-name()='outgoing']");

        const gatewaysOutgoingSFs = evaluateOutGoing.select({
            node,
        }).length;
        // const evaluateIncoming = xpath.parse("./*[local-name()='incoming']");
        const evaluateIncoming = parse("./*[local-name()='incoming']");

        const gatewaysIncomingSFs = evaluateIncoming.select({ node }).length;
        console.log(gatewaysOutgoingSFs);
        const totalSFsofGateway = gatewaysOutgoingSFs + gatewaysIncomingSFs;
        sumForAGD += totalSFsofGateway;
        sumForNSFG += totalSFsofGateway;
        console.log("1st");
        //prettier-ignore
        if (node.localName === BPMN_ELEMENTS.OR ||
            node.localName === BPMN_ELEMENTS.AND)
        {
            TS += gatewaysOutgoingSFs - 1;
        }
        if (totalSFsofGateway > currentMGD) {
            currentMGD = totalSFsofGateway;
        }

        const freqOfGate = gateFreq.get(node.localName);
        if (freqOfGate !== undefined)
            gateFreq.set(node.localName, freqOfGate + 1);
        if (gatewaysOutgoingSFs > gatewaysIncomingSFs) {
            //!this node is a split node
            //! CFC
            //prettier-ignore
            if(node.localName=== BPMN_ELEMENTS.OR){
                sumForCFC += 2**(gatewaysOutgoingSFs) -1
            }else if(node.localName===BPMN_ELEMENTS.AND){
                sumForCFC += 1;
            }else{
                sumForCFC += gatewaysOutgoingSFs;
            }

            //! GM
            if (
                node.localName === BPMN_ELEMENTS.OR ||
                node.localName === BPMN_ELEMENTS.XOR ||
                node.localName === BPMN_ELEMENTS.AND
            ) {
                //! GM we add his outgoing
                const gmSumOfType = mapForGM.get(node.localName);
                if (gmSumOfType !== undefined)
                    mapForGM.set(
                        node.localName,
                        gmSumOfType + gatewaysOutgoingSFs
                    );
            }
        } else {
            //!this node is a merge node
            if (
                node.localName === BPMN_ELEMENTS.OR ||
                node.localName === BPMN_ELEMENTS.XOR ||
                node.localName === BPMN_ELEMENTS.AND
            ) {
                //!so we subtract his incoming for GM
                const gmSumOfType = mapForGM.get(node.localName);
                if (gmSumOfType !== undefined)
                    mapForGM.set(
                        node.localName,
                        gmSumOfType - gatewaysIncomingSFs
                    );
            }
        }
    }
    //for this diagram it is 0 cos gates symmetric
    let GM = 0;
    mapForGM.forEach((value, key) => {
        GM += value;
    });
    //for this diagram it is 0 cos all gates of same time
    let GH = 0;
    gateFreq.forEach((value, key) => {
        const p_i = value / tng;
        const log3_p_i = Math.log(p_i) / Math.log(3);
        GH += p_i * log3_p_i;
    });
    mapWithComputedMetrics.set("CFC", sumForCFC);
    mapWithComputedMetrics.set("GH", -1 * GH.toFixed(2));
    mapWithComputedMetrics.set("GM", GM);
    mapWithComputedMetrics.set("NSFG", sumForNSFG);
    mapWithComputedMetrics.set("MGD", currentMGD);
    if (sumForAGD) {
        const AGD = sumForAGD / tng;
        mapWithComputedMetrics.set("AGD", AGD.toFixed(2));
    } else {
        mapWithComputedMetrics.set("AGD", -1);
    }
    mapWithComputedMetrics.set("TS", TS);

    // const evaluatorNSFA = xpath.parse(
    //     "//*[local-name()='sequenceFlow'][@sourceRef[starts-with(.,'Activity')] and ./@targetRef[starts-with(.,'Activity')]]"
    // );
    const evaluatorNSFA = parse(
        "//*[local-name()='sequenceFlow'][@sourceRef[starts-with(.,'Activity')] and ./@targetRef[starts-with(.,'Activity')]]"
    );
    const xpathResNSFA = evaluatorNSFA.select({
        node: xmlDoc,
    });
    const NSFA = xpathResNSFA.length;
    mapWithComputedMetrics.set("NSFA", NSFA);
    const evaluatorNOA = parse(
        "//*[contains(local-name(),'task') or contains(local-name(),'Task')]"
    );
    // const evaluatorNOA = xpath.parse(
    //     "//*[contains(local-name(),'task') or contains(local-name(),'Task')]"
    // );
    const xpathResNOA = evaluatorNOA.select({
        node: xmlDoc,
    });
    const NoA = xpathResNOA.length;
    mapWithComputedMetrics.set("NOA", NoA);
    mapWithComputedMetrics.set("NOAJS", NoA + tng);
    //we need non 0 value for nsfa

    if (NSFA) {
        const CLA = NoA / NSFA;
        mapWithComputedMetrics.set("CLA", CLA.toFixed(2));
    } else {
        mapWithComputedMetrics.set("CLA", -1);
    }

    return mapWithComputedMetrics;
}
