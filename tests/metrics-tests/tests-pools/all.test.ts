import { DOMParser } from "@xmldom/xmldom";
import * as CollaborationDiag from "../../samples/sample-collaboration";

import NSFA from "../../../src/utils/metrics/NSFA";
import NSFG from "../../../src/utils/metrics/NSFG";
import NOAJS from "../../../src/utils/metrics/NOAJS";
import NMF from "../../../src/utils/metrics/NMF";
import TS from "../../../src/utils/metrics/TS";
import TNG from "../../../src/utils/metrics/TNG";
import MGD from "../../../src/utils/metrics/MGD";
import AGD from "../../../src/utils/metrics/AGD";
import CFC from "../../../src/utils/metrics/CFC";
import CLA from "../../../src/utils/metrics/CLA";
import NSFE from "../../../src/utils/metrics/NSFE";
import GH from "../../../src/utils/metrics/GH";
import GM from "../../../src/utils/metrics/GM";
import NOA from "../../../src/utils/metrics/NOA";
import { getProcessXmlDocWithRefAttr } from "../../../src/utils/metrics/utils";
describe("should be able to calculate metrics on collaboration diagram (Participant = Αιτούντας)", () => {
    const parsedDocument = new DOMParser().parseFromString(
        CollaborationDiag.xmlStr,
        "text/xml"
    );
    const participantProcessRef = "Process_03dlkp9"; //Αιτούντας
    const participantDocument = getProcessXmlDocWithRefAttr(
        parsedDocument,
        participantProcessRef
    );

    it("should produce NOA (sample-collaboration) ", () => {
        const res = NOA.calculateAndUpdateResult(participantDocument);
        expect(res).toEqual(CollaborationDiag.expectedNOA);
    });
    it("should produce AGD (sample-collaboration) ", () => {
        AGD.calculateAndUpdateResult(participantDocument);
        expect(AGD.result).toEqual(CollaborationDiag.expectedAGD);
    });

    it("should produce NSFA (sample-collaboration) ", () => {
        NSFA.calculateAndUpdateResult(participantDocument);
        expect(NSFA.result).toEqual(CollaborationDiag.expectedNSFA);
    });

    it("should produce NSFG (sample-collaboration) ", () => {
        NSFG.calculateAndUpdateResult(participantDocument);
        expect(NSFG.result).toEqual(CollaborationDiag.expectedNSFG);
    });

    it("should produce NOAJS (sample-collaboration) ", () => {
        NOAJS.calculateAndUpdateResult(participantDocument);
        expect(NOAJS.result).toEqual(CollaborationDiag.expectedNOAJS);
    });

    it("should produce NMF (sample-collaboration) ", () => {
        NMF.calculateAndUpdateResult(participantDocument);
        expect(NMF.result).toEqual(CollaborationDiag.expectedNMF);
    });

    it("should produce TS (sample-collaboration) ", () => {
        TS.calculateAndUpdateResult(participantDocument);
        expect(TS.result).toEqual(CollaborationDiag.expectedTS);
    });

    it("should produce TNG (sample-collaboration) ", () => {
        TNG.calculateAndUpdateResult(participantDocument);
        expect(TNG.result).toEqual(CollaborationDiag.expectedTNG);
    });

    it("should produce MGD (sample-collaboration) ", () => {
        MGD.calculateAndUpdateResult(participantDocument);
        expect(MGD.result).toEqual(CollaborationDiag.expectedMGD);
    });

    it("should produce CFC (sample-collaboration) ", () => {
        CFC.calculateAndUpdateResult(participantDocument);
        expect(CFC.result).toEqual(CollaborationDiag.expectedCFC);
    });

    it("should produce CLA (sample-collaboration) ", () => {
        CLA.calculateAndUpdateResult(participantDocument);
        expect(CLA.result).toEqual(CollaborationDiag.expectedCLA);
    });

    it("should produce NSFE (sample-collaboration) ", () => {
        NSFE.calculateAndUpdateResult(participantDocument);
        expect(NSFE.result).toEqual(CollaborationDiag.expectedNSFE);
    });

    it("should produce GH (sample-collaboration) ", () => {
        GH.calculateAndUpdateResult(participantDocument);
        expect(GH.result).toEqual(CollaborationDiag.expectedGH);
    });

    it("should produce GM (sample-collaboration) ", () => {
        GM.calculateAndUpdateResult(participantDocument);
        expect(GM.result).toEqual(CollaborationDiag.expectedGM);
    });
});

describe("should be able to calculate metrics on collaboration diagram (Participant = Επιτροπή Αξιολόγησης)", () => {
    const parsedDocument = new DOMParser().parseFromString(
        CollaborationDiag.xmlStr,
        "text/xml"
    );

    const participantProcessRef = "Process_0g566ig"; //Επιτροπή Αξιολόγησης

    const participantDocument = getProcessXmlDocWithRefAttr(
        parsedDocument,
        participantProcessRef
    );
});
