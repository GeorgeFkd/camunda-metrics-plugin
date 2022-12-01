import CLA from "../../src/utils/metrics/CLA";
import { xmlStr, expectedCLA } from "../samples/sample-188";
import { DOMParser } from "xmldom";
describe("should be able to calculate CLA", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce CLA(sample-188) = ", () => {
        const result = parseFloat(CLA.calculateFn(parsedDocument).toFixed(2));

        expect(result).toEqual(expectedCLA);
    });
});
