import Metric from "./Metric-Class";
import { CalculateMetricFn } from "./utils";
import { countStructuralElements as analyzeXMLString } from "./utils";
import xpath from "xpath";

const NOA: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    const result = xpath.select(
        ".//*[matches(local-name(),'.*(t|T)ask')]",
        xmlDoc
    );
    return result.length;
};

const NOAObj = new Metric("NOA", -1, NOA, ["Activities"]);
export default NOAObj;
