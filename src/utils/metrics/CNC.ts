import { CalculateMetricFn } from "./utils";
import xpath from "xpath";
import Metric from "./Metric-Class";

const CNC: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //arcs/nodes
    const arcs = xpath.select("//*[local-name()='sequenceFlow']").length;
    const nodes = 1;
    //! //*[matches(local-name(),'.+Event')]
    //nodes = tasks + gateways + events??
    return 0;
};

const CNCObj = new Metric("CNC", -1, CNC, ["Flow"]);

export default CNCObj;
