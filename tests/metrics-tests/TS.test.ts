import TS from "../../src/utils/metrics/TS";
//188 has problem with TS
import { xmlStr, expectedTS } from "../samples/sample-213";
import { DOMParser } from "xmldom";
describe("should be able to calculate TS", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce TS(sample-188) = ", () => {
        const result = TS(parsedDocument);

        expect(result).toEqual(expectedTS);
    });
});
