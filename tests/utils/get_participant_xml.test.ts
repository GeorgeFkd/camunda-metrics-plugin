import { getProcessXmlDocWithRefAttr } from "../../src/utils/metrics/utils";
import { xmlStrOfParticipant, xmlStr } from "../samples/sample-collaboration";
import { DOMParser } from "@xmldom/xmldom";
describe("should be able to get participant document from collaboration diagram document", () => {
    const parsedDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
    const participantDocument = new DOMParser().parseFromString(
        xmlStrOfParticipant,
        "text/xml"
    );
    const participantRef = "Process_03dlkp9"; //Αιτούντας
    it("should return participant xml document(equality-> same child count)", () => {
        const participantDoc = getProcessXmlDocWithRefAttr(
            parsedDocument,
            participantRef
        );
        //Πώς συγκρίνω τα xml documents?(Αν έχουν τον ίδιο αριθμό των child elements)
        expect(participantDoc.childElementCount).toBe(
            participantDocument.childElementCount
        );
    });
});
