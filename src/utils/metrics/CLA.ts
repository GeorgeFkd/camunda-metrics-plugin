import { CalculateMetricFn } from "./utils";
import NOA from "./NOA";
import NSFA from "./NSFA";
const CLA: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    const nsfa = NSFA(xmlDoc);
    if (nsfa === 0) return -1;
    return NOA(xmlDoc) / nsfa;
};

export default CLA;
