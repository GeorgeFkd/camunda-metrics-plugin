import { CalculateMetricFn, getGatewaysInDiagram } from "./utils";
import xpath from "xpath";
import Metric from "./Metric-Class";
const MGD: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    const gatewaysOfDiagram = getGatewaysInDiagram(xmlDoc);
    const result = gatewaysOfDiagram.reduce((max, currentGate) => {
        const incomingAndOutgoingOfGateway = xpath.select(
            "./*[local-name()='incoming' or local-name()='outgoing']",
            currentGate
        ).length;
        return Math.max(max, incomingAndOutgoingOfGateway);
    }, 0);
    return result;
};

const MGDObj = new Metric("MGD", -1, MGD, ["Gateways"]);
export default MGDObj;
