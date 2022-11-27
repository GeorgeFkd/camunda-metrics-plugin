import GM from "../../src/utils/metrics/GM";
//188 has problem with GM
import { xmlStr, expectedGM } from "../samples/sample-213";
import { DOMParser } from "xmldom";
describe("should be able to calculate GM", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    it("should produce GM(sample-213) = ", () => {
        const result = GM(parsedDocument);

        expect(result).toEqual(expectedGM);
    });
});
