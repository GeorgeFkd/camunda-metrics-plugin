import AGD from "../src/utils/metrics/AGD";
import { xmlStr, expectedAGD } from "./samples/sample-1";
import { DOMParser } from "xmldom";
describe("should be able to calculate AGD", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce AGD = ", () => {
        const result = AGD(parsedDocument);

        expect(result).toEqual(expectedAGD);
    });
});
