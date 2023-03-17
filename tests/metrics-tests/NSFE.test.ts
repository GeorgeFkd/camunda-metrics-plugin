import NSFE from "../../src/utils/metrics/NSFE";
//188 has problem with NOAJS
import { xmlStr, expectedNSFE } from "../samples/sample-188";
import { DOMParser } from "xmldom";
describe("should be able to calculate NOAJS", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce NSFE(sample-collaboration) = ", () => {
        const result = NSFE.calculateFn(parsedDocument);

        expect(result).toEqual(expectedNSFE);
    });
});
