import { CalculateMetricFn } from "./utils";
import xpath from "xpath";
import Metric from "./Metric-Class";

const CNC: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //arcs/nodes
    return 0;
};

const CNCObj = new Metric("CNC", -1, CNC, ["Flow"]);

export default CNCObj;
