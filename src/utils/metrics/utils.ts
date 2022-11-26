import xpath from "xpath";
import { analyzeXMLString } from "../analyzeXMLString";
//TODO error values for each metric
interface MetricCalculationError {
    source: string;
    message: string;
}

export type CalculateMetricFn<Input> = (
    xmlDoc: Input
) => number | MetricCalculationError;

export const findSplitNodesOfGate = (xml: Document, gateName: string) => {
    return xpath.select(
        `//*[local-name()='${gateName}'][count(./*[local-name()='outgoing'])>1]`,
        xml
    );
};

export const getAmountOfBranchesOfThisGateNode = (node: Node): number => {
    return xpath.select("count(self::node()/*[local-name()='outgoing'])", node)
        .length;
};

export const countStructuralElements = analyzeXMLString;

export const elementNameIsConsideredActivity: (arg: string) => boolean = (
    elementName: string
) => {
    //first any exceptions
    if (typeof elementName !== "string")
        throw Error("element name supplied is not of type string");
    let thematches = elementName.match(/.*(T|t)ask$/g);
    if (thematches === null) return false;
    return thematches.length > 0;
};

export const getGatewaysTypes: (arg: Document) => string[] = (
    xmlDoc: Document
) => {
    return [];
};

export const getGatewaysInDiagram: (arg: Document) => Node[] = (
    xmlDoc: Document
) => {
    return [];
};

export const removeDuplicates = (arr: string[]) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
};
