import { CalculateMetricFn, getBranchesOfGateNode } from "./utils";
import { BPMN_ELEMENTS } from "../../assets/constants";
import xpath from "xpath";
import Metric from "./Metric-Class";
const TS: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //! seems correct
    const and_or_gateways = [BPMN_ELEMENTS.OR, BPMN_ELEMENTS.AND];
    const sum = and_or_gateways.reduce((total, current) => {
        const xpathRes = xpath.select(
            `.//*[local-name()='${current}']`,
            xmlDoc
        ) as Node[];
        const sumForThisTypeOfGateway = xpathRes.reduce((total, current) => {
            return total + getBranchesOfGateNode(current) - 1;
        }, 0);
        return (total += sumForThisTypeOfGateway);
    }, 0);
    return sum;
};

const TSObj = new Metric("TS", -1, TS, ["Flow", "Gateways"],"TS: Token Split");
export default TSObj;
