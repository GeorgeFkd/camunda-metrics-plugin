import { DOMParser } from "@xmldom/xmldom";
import { xmlStr } from "../samples/sample-188";
import metricResultsToText, {
    calculateMetricsResults,
} from "../../src/utils/metricResultsToText";
import CATEGORIES_WITH_METRICS from "../../src/utils/metrics/init_metrics";
describe("should be able to export metrics as text with a certain format", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    const expectedStr = `AGD,CFC,GH,MGD,NSFG,TNG,TS,GM,CLA,NOA,NOAJS,NSFA,DENSITY,CNC,NMF,NSFE
2.75,4.00,0.51,3.00,6.00,4.00,0.00,6.00,2.00,8.00,12.00,4.00,0.07,1.11,-1.00,3.00`;

    it("should produce a text file with the correct format", () => {
        const metricGroupsWithCalculatedResults = calculateMetricsResults(
            parsedDocument,
            CATEGORIES_WITH_METRICS
        );
        const str = metricResultsToText(metricGroupsWithCalculatedResults);
        expect(str).toBe(expectedStr);
    });
});
