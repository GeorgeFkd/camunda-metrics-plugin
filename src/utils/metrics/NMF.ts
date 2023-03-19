import { CalculateMetricFn, countStructuralElements } from "./utils";
import { BPMN_ELEMENTS } from "../../assets/constants";
import Metric from "./Metric-Class";
const NMF: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //can be written with xpath.select(//messageFlow) etc.
    const structuralElems = countStructuralElements(xmlDoc);
    const messageFlows = structuralElems.get(BPMN_ELEMENTS.MESSAGE_FLOW);
    if (messageFlows === undefined) {
        return -1;
    } else {
        return messageFlows;
    }
};

const NMFObj = new Metric("NMF", -1, NMF, ["Flow"]);

export default NMFObj;
