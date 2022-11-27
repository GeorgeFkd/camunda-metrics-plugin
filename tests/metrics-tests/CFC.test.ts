import CFC from "../../src/utils/metrics/CFC";
//188 has problem with CFC
import { xmlStr, expectedCFC } from "../samples/sample-213";
import { DOMParser } from "xmldom";
describe("should be able to calculate CFC", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce CFC(sample-188) = ", () => {
        const result = CFC(parsedDocument);

        expect(result).toEqual(expectedCFC);
    });
});
