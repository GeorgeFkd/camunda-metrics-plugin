import Metric from "./Metric-Class";
import { countStructuralElements, getGatewaysInDiagram } from "./utils";
import { CalculateMetricFn } from "./utils";
import xpath from "xpath";
const TNG: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //!not the best way will remove

    return getGatewaysInDiagram(xmlDoc).length;
};

const TNGObj = new Metric("TNG", -1, TNG, ["Gateways"]);
export default TNGObj;
