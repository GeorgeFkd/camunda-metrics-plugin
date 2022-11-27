import {
    CalculateMetricFn,
    getBranchesOfGateNode,
    getGatewaysInDiagram,
} from "./utils";
const NSFG: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    const gatewaysOfDiagram = getGatewaysInDiagram(xmlDoc);
    const result = gatewaysOfDiagram.reduce((total, current) => {
        return total + getBranchesOfGateNode(current);
    }, 0);
    return result;
};

export default NSFG;
