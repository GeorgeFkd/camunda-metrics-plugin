import xpath from "xpath";
import { DOMParser } from "xmldom";

//genika yparxoyn kapoies idiaiterothtes tou typou intermediate throw event einai kai to aplo
//kyklaki kai molis tou valeis ena messageEvent apo mesa ginetai me to envelope
//kai ta tasks perissotera for some reason ama exoun kai service allazei to tag opote gotta factor this in

//TODO convert xml element names to human readable names -> with an object

//console.log(xpath.select("//*[local-name()='exclusiveGateway']", xmlDoc));
//let gateways = xpath.select("//*[local-name()='exclusiveGateway']", xmlDoc);
//! console.log(gateways);
//! gateways.forEach((gate) =>
//!     console.log(
//!         xpath.select("count(self::node()/*[local-name()='outgoing'])", gate)
//!    )
//! );

const parser = new DOMParser();
export function analyzeXMLString(xmlStr) {
    if (!xmlStr) {
        return new Map();
    }
    const xmlDoc = parser.parseFromString(xmlStr);
    let allEls = xpath.select("//*", xmlDoc);

    let elNames = allEls.map((el) => el.localName);

    let distinctElemsInBpmnDiagram = new Set(elNames);

    let result = BpmnTagsCountOccurences(distinctElemsInBpmnDiagram, elNames);
    //TODO make user able to ignore certain elements [will this be done on the ui side or the backend side]
    //nomizw kalytera sto ui gia na mhn kanw teleiws remove pragmata apla na ta emfanizw kai na ta kryvw
    return result;
}

export function CFC_OF_DIAGRAM(xmlStr) {
    if (!xmlStr) {
        return { message: "sth went wrong" };
    }

    const xmlDoc = parser.parseFromString(xmlStr);
    let xorTagName = "exclusiveGateway";
    let orTagName = "inclusiveGateway";
    let andTagName = "parallelGateway";
    let eventBasedTagName = "eventBasedGateway";
    let complexTagName = "complexGateway";

    //i can write it using the above and continuing a bit furthe with self or ./shit
    const findSplitsOfGate = (xml, gateName) => {
        return xpath.select(
            `//*[local-name()='${gateName}'][count(./*[local-name()='outgoing'])>1]`,
            xml
        );
    };

    //splits are just
    const xorSplitNodes = findSplitsOfGate(xmlDoc, xorTagName);
    const orSplitNodes = findSplitsOfGate(xmlDoc, orTagName);
    const complexSplitNodes = findSplitsOfGate(xmlDoc, complexTagName);
    const andSplitNodes = findSplitsOfGate(xmlDoc, andTagName);
    const eventBasedSplitNodes = findSplitsOfGate(xmlDoc, eventBasedTagName);
    const getBranchesOfGateNode = (node) => {
        return xpath.select(
            "count(self::node()/*[local-name()='outgoing'])",
            node
        );
    };
    //for each tag calculate the possible states
    //xor -> n, or -> 2^n-1, and -> 1, tis alles den kserw
    //ama to na einai nested einai alliws this goes to trash
    console.log(xorSplitNodes);
    //is OK
    const CFC_OF_XOR = xorSplitNodes.reduce((total, current) => {
        return total + getBranchesOfGateNode(current) * 1;
    }, 0);
    //is OK
    const CFC_OF_OR = orSplitNodes.reduce((total, current) => {
        console.log(getBranchesOfGateNode(current));
        //prettier-ignore
        return total + 2 ** (getBranchesOfGateNode(current)) - 1;
    }, 0);
    const CFC_OF_AND = andSplitNodes.reduce((total, current) => {
        //getting the length is the same
        //prettier-ignore
        return total + 1;
    }, 0);
    console.log(CFC_OF_OR);
}

function BpmnTagsCountOccurences(uniqueTagsInDiagram, allTags) {
    if (!uniqueTagsInDiagram) {
        return new Map();
    }
    let result = new Map();
    uniqueTagsInDiagram.forEach((tagName) => {
        let elems = allTags.filter((name) => {
            return name === tagName;
        });
        //here i can get any edge cases
        if (tagName === "subProcess") {
            result.set(tagName, elems.length / 2);
        } else {
            result.set(tagName, elems.length);
        }
    });
    return result;
}
