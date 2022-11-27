import { CalculateMetricFn } from "./utils";
import NOA from "./NOA";
import TNG from "./TNG";
const NOAJS: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //!correct
    return NOA(xmlDoc) + TNG(xmlDoc);
};

export default NOAJS;
