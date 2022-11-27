import AGD from "../../src/utils/metrics/AGD";
import { xmlStr, expectedAGD } from "../samples/sample-188";
import { DOMParser } from "xmldom";
describe("should be able to calculate AGD", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce AGD (sample-188) ", () => {
        const result = AGD(parsedDocument);

        expect(result).toEqual(expectedAGD);
    });
});
