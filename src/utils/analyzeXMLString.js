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
    return CFC_OF_OR + CFC_OF_AND + CFC_OF_XOR;
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

export function AGD_OF_Diagram(diagramXml) {
    //* is common refactor to method
    const xmlDoc = parser.parseFromString(diagramXml);
    //get gate types from diagram
    const xmlElementsCount = analyzeXMLString(diagramXml);
    const allTypesOfGateways = new Set(
        Array.from(xmlElementsCount.keys()).filter((bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        })
    );

    const arrayOfGatewayTypes = Array.from(allTypesOfGateways);

    //this needs a check
    const sumOfIncomingOutgoingOfGateways = arrayOfGatewayTypes.reduce(
        (total, current) => {
            const evaluator = xpath.parse(
                `//*[local-name()='${current}']/*[local-name()='incoming' or local-name()='outgoing']`
            );

            const xpathRes = evaluator.select({
                node: xmlDoc,
            });
            return (total += xpathRes.length);
        },
        0
    );
    const sum =
        sumOfIncomingOutgoingOfGateways /
        arrayOfGatewayTypes.reduce((total, current) => {
            const evaluator = xpath.parse(`//*[local-name()='${current}']`);
            const xpathRes = evaluator.select({
                node: xmlDoc,
            });
            return xpathRes.length;
        }, 0);

    return sum;
}

export function MGD_OF_Diagram(diagramXml) {
    //it doesnt have the ends-with() method
    // first->/*[ends-with(local-name(),'Gateway')]
    // then-> count(self::node()/*[local-name()='outgoing' or local-name()='incoming']) valid af
    //  //*[local-name()='inclusiveGateway']
    //  /*[local-name()='outgoing' or local-name()='incoming']
    const xmlDoc = parser.parseFromString(diagramXml);
    const xmlElementsCount = analyzeXMLString(diagramXml);
    //* paizei to new Set() na mhn xreiazetai
    const allTypesOfGateways = new Set(
        Array.from(xmlElementsCount.keys()).filter((bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        })
    );

    const allTypesOfGatewaysArray = Array.from(allTypesOfGateways);
    console.log(allTypesOfGatewaysArray, "all gates here");
    const allGatewayNodes = allTypesOfGatewaysArray
        .map((typeOfGateway) => {
            const evaluator = xpath.parse(
                `//*[local-name()='${typeOfGateway}']`
            );
            return evaluator.select({
                node: xmlDoc,
            });
        })
        .flat(1);
    console.log(allGatewayNodes.length); //we good
    //now for each gateway count their children and reduce it to the max element
    const evaluator = xpath.parse(
        "./*[local-name()='outgoing' or local-name()='incoming']"
    );
    const initialValue = evaluator.select({
        node: allGatewayNodes[0],
    }).length;
    console.log(initialValue);
    const result = allGatewayNodes.reduce(function (prev, current) {
        const evaluator = xpath.parse(
            "./*[local-name()='outgoing' or local-name()='incoming']"
        );
        const amountOfChildrenOfCurrent = evaluator.select({
            node: current,
        }).length;
        return Math.max(prev, amountOfChildrenOfCurrent);
    }, initialValue);

    return result;
}

export function NSFA_OF_Diagram(diagramXml) {
    const xmlDoc = parser.parseFromString(diagramXml);
    //if sourceRef and targetRef start with 'Activity______' they pass the check
    const evaluator = xpath.parse(
        "//*[local-name()='sequenceFlow'][@sourceRef[starts-with(.,'Activity')] and ./@targetRef[starts-with(.,'Activity')]]"
    );
    const xpathRes = evaluator.select({
        node: xmlDoc,
    });

    return xpathRes.length;
}

export function NoA_OF_Diagram(diagramXml) {
    const data = analyzeXMLString(diagramXml);
    const allTypesOfTasks = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.toLowerCase().includes("task");
    });
    console.log(allTypesOfTasks);
    //ta subprocesses metrane sa task h oxi? gt ena mpainei panw kai ena otan to kaneis expand
    //epishs ta callActivity einai diaforetika
    //prepei na ta kanw include
    const result = allTypesOfTasks.reduce((total, value) => {
        return (total += data.get(value));
    }, 0);
    return result;
}

export function NoAJS_OF_Diagram(diagramXml) {
    const NoA = NoA_OF_Diagram(diagramXml);
    const xmlElementsCount = analyzeXMLString(diagramXml);
    const typesOfGateways = Array.from(xmlElementsCount.keys()).filter(
        (bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        }
    );
    const sumOfAllGateways = typesOfGateways.reduce((total, current) => {
        return (total += xmlElementsCount.get(current));
    }, 0);
    console.log(NoA, sumOfAllGateways);

    return NoA + sumOfAllGateways;
}
export function CLA_OF_Diagram(diagramXml) {
    const nsfa = NSFA_OF_Diagram(diagramXml);
    if (nsfa === 0) return -1;
    return NoA_OF_Diagram(diagramXml) / nsfa;
}
export function NSFG_OF_Diagram(diagramXml) {
    const xmlDoc = parser.parseFromString(diagramXml);
    //get gate types from diagram
    const xmlElementsCount = analyzeXMLString(diagramXml);
    const allTypesOfGateways = new Set(
        Array.from(xmlElementsCount.keys()).filter((bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        })
    );

    const arrayOfGatewayTypes = Array.from(allTypesOfGateways);

    const sumOfIncomingOutgoingOfGateways = arrayOfGatewayTypes.reduce(
        (total, current) => {
            const evaluator = xpath.parse(
                `//*[local-name()='${current}']/*[local-name()='incoming' or local-name()='outgoing']`
            );

            const xpathRes = evaluator.select({
                node: xmlDoc,
            });
            return xpathRes.length;
        },
        0
    );
    return sumOfIncomingOutgoingOfGateways;
}

export function GH_OF_Diagram(diagramXml) {
    //Math.log(x) / Math.log(otherBase)
    const xmlDoc = parser.parseFromString(diagramXml);
    const numberOfGatewaysInDiagram = TNG_OF_Diagram(diagramXml);
    const xmlElementsCount = analyzeXMLString(diagramXml);
    const allTypesOfGateways = Array.from(xmlElementsCount.keys()).filter(
        (bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        }
    );
    //const allTypesOfGatewaysArray = Array.from(allTypesOfGateways);
    console.log(allTypesOfGateways);
    //for each type i divide his frequency to the total number
    //TODO implement the actual equation
    const res = allTypesOfGateways.map((gatewayType) => {
        const evaluator = xpath.parse(`//*[local-name()='${gatewayType}']`);
        const xpathRes = evaluator.select({ node: xmlDoc });
        const numberOfGatewaysOfCurrentType = xpathRes.length;
        const result =
            numberOfGatewaysOfCurrentType / numberOfGatewaysInDiagram;
        return { gatewayType, result };
    });
    console.log(res);
    return res;
}
export function GH_OF_Gate(diagramXml, gatewayType) {
    const allGatesGH = GH_OF_Diagram(diagramXml);
    const specificGateGH = allGatesGH.filter((elem) => {
        return elem.gatewayType === gatewayType;
    });
    if (specificGateGH.length === 0) {
        return { gatewayType, result: 0 };
    }

    return specificGateGH[0];
}

export function TNG_OF_Diagram(diagramXml) {
    const xmlDoc = parser.parseFromString(diagramXml);
    const xmlElementsCount = analyzeXMLString(diagramXml);
    const result = Array.from(xmlElementsCount.keys()).reduce(
        (total, currentbpmnElement) => {
            if (currentbpmnElement.endsWith("Gateway")) {
                total += xmlElementsCount.get(currentbpmnElement);
            }
            return total;
        },
        0
    );

    return result;
}

export function TS_OF_Diagram(diagramXml) {
    //i have to get all or , and gates and then count their outgoing children-1
    const xmlDoc = parser.parseFromString(diagramXml);
    const and_or_gateways = ["inclusiveGateway", "parallelGateway"];
    const sum = and_or_gateways.reduce((total, current) => {
        const evaluator = xpath.parse(`//*[local-name()='${current}']`);
        ///*[local-name()='outgoing']
        const xpathRes = evaluator.select({
            node: xmlDoc,
        });
        let sumForThisTypeOfGateway = 0;
        for (let elem of xpathRes) {
            const currentEval = xpath.select(
                "count(self::node()/*[local-name()='outgoing'])",
                elem
            );
            sumForThisTypeOfGateway += Number(currentEval) - 1;
        }
        return (total += sumForThisTypeOfGateway);
    }, 0);
    return sum;
}
export function GM_OF_Diagram(xmlStr) {
    return -1;
}

export default function calculateAllMetrics(xmlStr) {
    // const data = analyzeXMLString(xmlStr); for less calculations later
    let arrayWithAllComputedMetrics = [];
    arrayWithAllComputedMetrics.push({
        name: "AGD",
        result: AGD_OF_Diagram(xmlStr),
    });

    arrayWithAllComputedMetrics.push({
        name: "MGD",
        result: MGD_OF_Diagram(xmlStr),
    });

    arrayWithAllComputedMetrics.push({
        name: "NSFA",
        result: NSFA_OF_Diagram(xmlStr),
    });

    arrayWithAllComputedMetrics.push({
        name: "NOA",
        result: NoA_OF_Diagram(xmlStr),
    });

    arrayWithAllComputedMetrics.push({
        name: "NOAJS",
        result: NoAJS_OF_Diagram(xmlStr),
    });

    arrayWithAllComputedMetrics.push({
        name: "NSFG",
        result: NSFG_OF_Diagram(xmlStr),
    });
    arrayWithAllComputedMetrics.push({
        name: "CLA",
        result: CLA_OF_Diagram(xmlStr),
    });
    arrayWithAllComputedMetrics.push({
        name: "GH_XOR",
        result: GH_OF_Gate(xmlStr, "exclusiveGateway"),
    });
    arrayWithAllComputedMetrics.push({
        name: "GH_OR",
        result: GH_OF_Gate(xmlStr, "inclusiveGateway"),
    });
    arrayWithAllComputedMetrics.push({
        name: "GH_AND",
        result: GH_OF_Gate(xmlStr, "parallelGateway"),
    });
    arrayWithAllComputedMetrics.push({
        name: "GH",
        result: GH_OF_Diagram(xmlStr),
    });
    arrayWithAllComputedMetrics.push({
        name: "TS",
        result: TS_OF_Diagram(xmlStr),
    });
    arrayWithAllComputedMetrics.push({
        name: "GM",
        result: GM_OF_Diagram(xmlStr),
    });

    console.log("HERE CMON");
    return arrayWithAllComputedMetrics;
}
