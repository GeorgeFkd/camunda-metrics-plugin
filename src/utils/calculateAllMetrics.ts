import xpath from "xpath";
// import { parse, select } from "xpath";
import { DOMParser } from "xmldom";
import { countStructuralElements as analyzeXMLString } from "./metrics/utils";
import { BPMN_ELEMENTS } from "../assets/constants";

type CalculateMetricFn<Input> = (xmlDoc: Input) => number;

const parser = new DOMParser();
export const CFC_OF_DIAGRAM: CalculateMetricFn<Document> = (
    xmlDoc: Document
) => {
    if (!xmlDoc) {
        return -1;
    }

    //const xmlDoc = parser.parseFromString(xmlStr);
    //let xorTagName = "exclusiveGateway";
    //let orTagName = "inclusiveGateway";
    //let andTagName = "parallelGateway";
    let eventBasedTagName = "eventBasedGateway";
    let complexTagName = "complexGateway";

    //i can write it using the above and continuing a bit furthe with self or ./shit
    const findSplitsOfGate = (xml: Document, gateName: string) => {
        return xpath.select(
            `//*[local-name()='${gateName}'][count(./*[local-name()='outgoing'])>1]`,
            xml
        );
    };

    //splits are just
    const xorSplitNodes = findSplitsOfGate(xmlDoc, BPMN_ELEMENTS.XOR);
    const orSplitNodes = findSplitsOfGate(xmlDoc, BPMN_ELEMENTS.OR);
    const complexSplitNodes = findSplitsOfGate(xmlDoc, complexTagName);
    const andSplitNodes = findSplitsOfGate(xmlDoc, BPMN_ELEMENTS.AND);
    const eventBasedSplitNodes = findSplitsOfGate(xmlDoc, eventBasedTagName);
    const getBranchesOfGateNode = (node: Node): number => {
        return xpath.select(
            "count(self::node()/*[local-name()='outgoing'])",
            node
        ).length;
    };
    //for each tag calculate the possible states
    //xor -> n, or -> 2^n-1, and -> 1, tis alles den kserw
    //ama to na einai nested einai alliws this goes to trash
    //is OK
    const CFC_OF_XOR = (xorSplitNodes as Node[]).reduce((total, current) => {
        return (total as number) + getBranchesOfGateNode(current) * 1;
    }, 0);
    //is OK
    const CFC_OF_OR = (orSplitNodes as Node[]).reduce((total, current) => {
        console.log(getBranchesOfGateNode(current));
        //prettier-ignore
        return (total as number) + 2 ** (getBranchesOfGateNode(current as Node)) - 1;
    }, 0);
    const CFC_OF_AND = (andSplitNodes as Node[]).reduce((total, current) => {
        //getting the length is the same
        //prettier-ignore
        return (total as number) + 1;
    }, 0);
    return CFC_OF_OR + CFC_OF_AND + CFC_OF_XOR;
};

export const AGD_OF_Diagram: CalculateMetricFn<Document> = (
    xmlDoc: Document
) => {
    //* is common refactor to method
    //const xmlDoc = parser.parseFromString(diagramXml);
    //get gate types from diagram
    const xmlElementsCount = analyzeXMLString(xmlDoc);
    const allTypesOfGateways = new Set(
        Array.from(xmlElementsCount.keys()).filter((bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        })
    );

    const arrayOfGatewayTypes = Array.from(allTypesOfGateways);
    if (arrayOfGatewayTypes.length === 0) {
        console.log("No gateways in diagram");
        return -1;
    }
    //this needs a check
    const sumOfIncomingOutgoingOfGateways = arrayOfGatewayTypes.reduce(
        (total, current) => {
            const xpathRes = xpath.select(
                `//*[local-name()='${current}']/*[local-name()='incoming' or local-name()='outgoing']`,
                xmlDoc
            );

            // const xpathRes = evaluator.select({
            //     node: xmlDoc,
            // });
            return (total += xpathRes.length);
        },
        0
    );
    const sum = sumOfIncomingOutgoingOfGateways / TNG_OF_Diagram(xmlDoc);

    return sum;
};

export function MGD_OF_Diagram(xmlDoc: Document) {
    //it doesnt have the ends-with() method
    //const xmlDoc = parser.parseFromString(diagramXml);
    const xmlElementsCount = analyzeXMLString(xmlDoc);
    //* paizei to new Set() na mhn xreiazetai
    const allTypesOfGateways: Set<string> = new Set(
        Array.from(xmlElementsCount.keys()).filter((bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        })
    );

    const allTypesOfGatewaysArray = Array.from(allTypesOfGateways);
    console.log(allTypesOfGatewaysArray, "all gates here");
    if (allTypesOfGatewaysArray.length === 0) {
        console.log("No gateways in the diagram");
        return -1;
    }
    const allGatewayNodes = allTypesOfGatewaysArray
        .map((typeOfGateway) => {
            const xpathRes = xpath.select(
                `//*[local-name()='${typeOfGateway}']`,
                xmlDoc
            );
            return xpathRes;
            // return evaluator.select({
            //     node: xmlDoc,
            // });
        })
        .flat(1) as Node[];
    //now for each gateway count their children and reduce it to the max element
    // const evaluator = xpath.parse(
    //     "./*[local-name()='outgoing' or local-name()='incoming']"
    // );
    const initialValue = xpath.select(
        "./*[local-name()='outgoing' or local-name()='incoming']",
        allGatewayNodes[0]
    ).length;
    const result = allGatewayNodes.reduce((prev, current) => {
        // const evaluator = xpath.parse(
        //     "./*[local-name()='outgoing' or local-name()='incoming']"
        // );
        const amountOfChildrenOfCurrent = xpath.select(
            "./*[local-name()='outgoing' or local-name()='incoming']",
            current
        ).length;
        return Math.max(prev, amountOfChildrenOfCurrent);
    }, initialValue);

    return result;
}

function elementNameIsConsideredActivity(elementName: string) {
    //first any exceptions
    if (typeof elementName !== "string")
        throw Error("element name supplied is not of type string");
    let thematches = elementName.match(/.*(T|t)ask$/g);
    if (thematches === null) return false;
    return thematches.length > 0;
}

export function NSFA_OF_Diagram(xmlDoc: Document) {
    const allSFs = xpath.select(
        "//*[local-name()='sequenceFlow']",
        xmlDoc
    ) as Node[];

    const sum = allSFs.reduce((total, current) => {
        //get its target ref and its sourceRef
        const [sourceRef, targetRef] = xpath.select(
            "./@*[matches(local-name(),'(source|target)Ref')]",
            current
        ) as Node[];
        console.log(sourceRef, targetRef);
        const sourceNodes = xpath.select(
            `//*[@id='${sourceRef.nodeValue}']`,
            xmlDoc
        ) as Node[];
        const targetNodes = xpath.select(
            `//*[@id='${targetRef.nodeValue}']`,
            xmlDoc
        ) as Node[];
        console.log("found here:", sourceNodes, targetNodes);
        if (sourceNodes.length > 0 && targetNodes.length > 0) {
            const sourceNode = sourceNodes[0];
            const targetNode = targetNodes[0];
            console.log(sourceNode, targetNode);
            if (
                elementNameIsConsideredActivity(
                    sourceNode.nodeName.replace(/.+:/, "")
                ) &&
                elementNameIsConsideredActivity(
                    targetNode.nodeName.replace(/.+:/, "")
                )
            ) {
                console.log("we add it ");
                return (total += 1);
            }
        }
        // console.log(sourceNode, targetNode);
        return total;
    }, 0);
    return sum;
}
export function NoA_OF_Diagram(xmlDoc: Document) {
    const data = analyzeXMLString(xmlDoc);
    const allTypesOfTasks = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.toLowerCase().includes("task");
    });
    console.log(allTypesOfTasks);
    //ta subprocesses metrane sa task h oxi? gt ena mpainei panw kai ena otan to kaneis expand
    //epishs ta callActivity einai diaforetika
    //prepei na ta kanw include
    const result = allTypesOfTasks.reduce((total, value) => {
        return (total += data.get(value) as number);
    }, 0);
    return result;
}
export function NoAJS_OF_Diagram(xmlDoc: Document) {
    const NoA = NoA_OF_Diagram(xmlDoc);
    const xmlElementsCount = analyzeXMLString(xmlDoc);
    const typesOfGateways = Array.from(xmlElementsCount.keys()).filter(
        (bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        }
    );
    const sumOfAllGateways = typesOfGateways.reduce((total, current) => {
        return (total += xmlElementsCount.get(current) as number);
    }, 0);
    console.log(NoA, sumOfAllGateways);

    return NoA + sumOfAllGateways;
}
export function CLA_OF_Diagram(xmlDoc: Document) {
    const nsfa = NSFA_OF_Diagram(xmlDoc);
    if (nsfa === 0) return -1;
    return NoA_OF_Diagram(xmlDoc) / nsfa;
}
export function NSFG_OF_Diagram(xmlDoc: Document) {
    //const xmlDoc = parser.parseFromString(diagramXml);
    //get gate types from diagram
    const xmlElementsCount = analyzeXMLString(xmlDoc);
    const allTypesOfGateways = new Set(
        Array.from(xmlElementsCount.keys()).filter((bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        })
    );

    const arrayOfGatewayTypes = Array.from(allTypesOfGateways);

    //! probably only the outgoing ones
    const sumOfIncomingOutgoingOfGateways = arrayOfGatewayTypes.reduce(
        (total, current) => {
            // const evaluator = xpath.parse(
            //     `//*[local-name()='${current}']/*[local-name()='incoming' or local-name()='outgoing']`
            // );

            const xpathRes = xpath.select(
                `//*[local-name()='${current}']/*[local-name()='incoming' or local-name()='outgoing']`,
                xmlDoc
            );
            return xpathRes.length;
        },
        0
    );
    return sumOfIncomingOutgoingOfGateways;
}
export function GH_OF_Diagram(xmlDoc: Document) {
    //Math.log(x) / Math.log(otherBase)
    //const xmlDoc = parser.parseFromString(diagramXml);
    const numberOfGatewaysInDiagram = TNG_OF_Diagram(xmlDoc);
    const xmlElementsCount = analyzeXMLString(xmlDoc);
    const allTypesOfGateways = Array.from(xmlElementsCount.keys()).filter(
        (bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        }
    );
    if (allTypesOfGateways.length === 0) return 0;
    //const allTypesOfGatewaysArray = Array.from(allTypesOfGateways);
    //for each type i divide his frequency to the total number
    //TODO implement the actual equation
    const res = allTypesOfGateways.map((gatewayType) => {
        //const evaluator = xpath.parse(`//*[local-name()='${gatewayType}']`);
        const xpathRes = xpath.select(
            `//*[local-name()='${gatewayType}']`,
            xmlDoc
        );
        const numberOfGatewaysOfCurrentType = xpathRes.length;
        const p_i = numberOfGatewaysOfCurrentType / numberOfGatewaysInDiagram;
        const result = -1 * (Math.log(p_i) / Math.log(3)) * p_i;
        return { gatewayType, result };
    });
    const total = res.reduce((total, current) => {
        console.log(current.result);
        return (total += current.result);
    }, 0);
    console.log(total, "GHHHH LESGOOO");
    return total;
}
// export function GH_OF_Gate(xmlDoc:Document, gatewayType:string) {
//     const allGatesGH = GH_OF_Diagram(xmlDoc);
//     const specificGateGH = allGatesGH.filter((elem) => {
//         return elem.gatewayType === gatewayType;
//     });
//     if (specificGateGH.length === 0) {
//         return { gatewayType, result: 0 };
//     }

//     return specificGateGH[0];
// }
export function TNG_OF_Diagram(xmlDoc: Document) {
    //const xmlDoc = parser.parseFromString(diagramXml);
    const xmlElementsCount = analyzeXMLString(xmlDoc);
    const result = Array.from(xmlElementsCount.keys()).reduce(
        (total, currentbpmnElement) => {
            if (currentbpmnElement.endsWith("Gateway")) {
                total += xmlElementsCount.get(currentbpmnElement) as number;
            }
            return total;
        },
        0
    );

    return result;
}
export function TS_OF_Diagram(xmlDoc: Document) {
    //i have to get all or , and gates and then count their outgoing children-1
    //const xmlDoc = parser.parseFromString(diagramXml);
    const and_or_gateways = [BPMN_ELEMENTS.OR, BPMN_ELEMENTS.OR];
    const sum = and_or_gateways.reduce((total, current) => {
        //const evaluator = xpath.parse(`//*[local-name()='${current}']`);
        ///*[local-name()='outgoing']
        const xpathRes = xpath.select(
            `//*[local-name()='${current}']`,
            xmlDoc
        ) as Node[];
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

function removeDuplicates(arr: string[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

//?what to return if no gateways
export function GM_OF_Diagram(xmlDoc: Document) {
    //?if only splits bcs of knockout tasks?
    const NO_GATEWAYS_DEFAULT_GM_VALUE = -0;
    //const xmlDoc = parser.parseFromString(diagramXml);
    // const gatewayevaluator = xpath.parse(
    //     "//*[ends-with(local-name(),'Gateway') and local-name()!='Bounds']"
    // );

    const gatewaysXpathRes = xpath.select(
        "//*[ends-with(local-name(),'Gateway') and local-name()!='Bounds']",
        xmlDoc
    ) as Node[];
    if (gatewaysXpathRes.length === 0) {
        return NO_GATEWAYS_DEFAULT_GM_VALUE;
    }
    const gatewayTypes = removeDuplicates(
        gatewaysXpathRes.map((el) => {
            //yparxei h idiothta sta objects alla den fainetai
            const localName = el.nodeName.replace(/.+:/, "");
            return localName;
        })
    );

    const mapForGM = new Map<string, number>();
    gatewayTypes.forEach((type) => mapForGM.set(type, 0));
    const acceptedTypesForGM = [
        BPMN_ELEMENTS.OR,
        BPMN_ELEMENTS.XOR,
        BPMN_ELEMENTS.AND,
    ];
    const only_OR_AND_XOR_gateways = gatewaysXpathRes.filter((gatewayNode) => {
        const localName = gatewayNode.nodeName.replace(/.+:/, "");
        return acceptedTypesForGM.includes(localName);
    });

    //const evaluateOutGoing = xpath.parse("./*[local-name()='outgoing']");
    //const evaluateIncoming = xpath.parse("./*[local-name()='incoming']");

    for (let gateway of only_OR_AND_XOR_gateways) {
        const gmSumOfType = mapForGM.get(gateway.nodeName.replace(/.+:/, ""));
        //const incomingSFs = evaluateIncoming.select({ node: gateway }).length;
        //const outgoingSFs = evaluateOutGoing.select({ node: gateway }).length;
        const outgoingSFs = xpath.select(
            "./*[local-name()='outgoing']",
            xmlDoc
        ).length;
        const incomingSFs = xpath.select(
            "./*[local-name()='incoming']",
            xmlDoc
        ).length;
        let gatewayWithLocalName = {
            ...gateway,
            localName: gateway.nodeName.replace(/.+:/, ""),
        };
        console.log("Incoming:", incomingSFs, "Outgoing:", outgoingSFs);
        if (gmSumOfType !== undefined) {
            if (incomingSFs > outgoingSFs) {
                //! this is a merge node
                mapForGM.set(
                    gatewayWithLocalName.localName,
                    gmSumOfType - incomingSFs
                );
            } else if (incomingSFs < outgoingSFs) {
                //! this is a split node
                mapForGM.set(
                    gatewayWithLocalName.localName,
                    gmSumOfType + outgoingSFs
                );
            } else {
                //! this is a problematic node(it is but lets not throw errors around)
                //TODO discuss how those are handled
                console.error(
                    "This gateway has the same amount of incoming and outgoing sequence flows"
                );
                // throw Error(
                //     "a gateway can't have the same amount of incoming and outgoing sequence flows"
                // );
            }
        } else {
            throw Error("Sth went wrong");
        }
    }
    console.log(mapForGM);
    let GM = 0;
    mapForGM.forEach((value, key) => {
        GM += value;
    });

    return Math.abs(GM);
}
