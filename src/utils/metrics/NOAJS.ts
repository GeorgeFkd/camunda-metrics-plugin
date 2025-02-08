import { CalculateMetricFn } from "./utils";
import NOA from "./NOA";
import TNG from "./TNG";
import Metric from "./Metric-Class";
const NOAJS: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    return NOA.calculateFn(xmlDoc) + TNG.calculateFn(xmlDoc);
};

const NOAJSObj = new Metric("NOAJS", -1, NOAJS, ["Activities"],"NOAJS: Number of Activity and Joins-Splits, defined as NOA + TNG");
export default NOAJSObj;
