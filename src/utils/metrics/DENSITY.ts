import { CalculateMetricFn, getEventsInDiagram } from "./utils";
import xpath from "xpath";
import Metric from "./Metric-Class";
import NOA from "./NOA";
import TNG from "./TNG";
const DENSITY: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    if (!xmlDoc) return -1;
    const events = getEventsInDiagram(xmlDoc).length;
    const nodes = NOA.calculateFn(xmlDoc) + TNG.calculateFn(xmlDoc) + events;
    if (nodes < 2) return -1;
    //  or local-name()='messageFlow']
    const arcs = xpath.select(
        ".//*[local-name()='sequenceFlow']",
        xmlDoc
    ).length;

    return arcs / (nodes * (nodes - 1));
};

const DENSITYObj = new Metric("DENSITY", -1, DENSITY, ["Flow"],"Density measures how tightly connected the process is");
export default DENSITYObj;
