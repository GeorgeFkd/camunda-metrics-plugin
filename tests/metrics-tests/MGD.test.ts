import MGD from "../../src/utils/metrics/MGD";
import { xmlStr, expectedMGD } from "../samples/sample-213";
import { DOMParser } from "xmldom";
describe("should be able to calculate MGD", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce MGD(sample-188) = ", () => {
        const result = MGD(parsedDocument);

        expect(result).toEqual(expectedMGD);
    });
});
