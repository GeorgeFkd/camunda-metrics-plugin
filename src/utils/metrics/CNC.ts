import { CalculateMetricFn } from "./utils";
import xpath from "xpath";
import Metric from "./Metric-Class";
import NOA from "./NOA";
import TNG from "./TNG";
const CNC: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //arcs/nodes
    const arcs = xpath.select(
        "//*[local-name()='sequenceFlow']",
        xmlDoc
    ).length;
    const events = xpath.select(
        "//*[matches(local-name(),'.+Event$')]",
        xmlDoc
    ).length;
    const nodes = NOA.calculateFn(xmlDoc) + TNG.calculateFn(xmlDoc) + events;
    //! //*[matches(local-name(),'.+Event')]
    //nodes = tasks + gateways + events??
    if (nodes === 0) return -1;
    return arcs / nodes;
};

const CNCObj = new Metric("CNC", -1, CNC, ["Flow"]);

export default CNCObj;
