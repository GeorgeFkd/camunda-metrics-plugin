import { CalculateMetricFn } from "./utils";
import xpath from "xpath";
import Metric from "./Metric-Class";

const DENSITY: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    return 0;
};

const DENSITYObj = new Metric("DENSITY", -1, DENSITY, ["Flow"]);
export default DENSITYObj;
