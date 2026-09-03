import { create } from "zustand";
import { MetricGroup } from "../assets/typed-constants";
import { getProcessXmlDocWithRefAttr } from "../utils/metrics/utils";
import CATEGORIES_WITH_METRICS from "../utils/metrics/init_metrics";
import { ModelerFile } from "../utils/metricConfigStorage";
import { DOMParser } from "@xmldom/xmldom";

const parser = new DOMParser();
interface State {
    xmlfile: string;
    xmlDoc: Document;
    metricGroups: MetricGroup[];
    //the active tab's file, used to key the persisted metric config per file.
    //null while nothing is open / before the first tab change.
    currentFile: ModelerFile | null;
    //probably not string,not used yet but will soon
    structuralElementsTracked: string[];
    currentSelectedParticipant: { name: string; processRef: string };
}

export interface Participant {
    name: string;
    processRef: string;
}
interface Actions {
    addMetricGroup: (m: MetricGroup) => void;
    updateGroups: (mgroups: MetricGroup[]) => void;
    //replace the groups with a config loaded from disk (or the built-in
    //defaults). Like updateGroups it re-triggers a metrics recalculation.
    setMetricGroups: (mgroups: MetricGroup[]) => void;
    setCurrentFile: (file: ModelerFile | null) => void;
    updateStructuralElementsTracked: (elems: string[]) => void;
    setParticipant: (participant: Participant) => void;
    changeXmlFile: (file: string) => void;
    updateXmlFile: (file: string) => void;
}

const useStore = create<State & Actions>()((set, get) => ({
    metricGroups: CATEGORIES_WITH_METRICS,
    currentFile: null,
    structuralElementsTracked: [],
    xmlDoc: new Document(),
    xmlfile: "",
    currentSelectedParticipant: { name: "", processRef: "" },
    setMetricGroups: (mgroups) =>
        set((state) => {
            const otherDoc = state.xmlDoc.cloneNode(true) as Document;
            return { ...state, metricGroups: mgroups, xmlDoc: otherDoc };
        }),
    setCurrentFile: (file) =>
        set((state) => ({ ...state, currentFile: file })),
    updateStructuralElementsTracked: (elems) =>
        set((state) => {
            return {
                ...state,
                structuralElementsTracked: elems,
            };
        }),
    addMetricGroup: (m) =>
        set((state) => {
            return { ...state, metricGroups: [...state.metricGroups, m] };
        }),
    updateGroups: (mgroups) =>
        set((state) => {
            const otherDoc = state.xmlDoc.cloneNode(true) as Document;
            return { ...state, metricGroups: mgroups, xmlDoc: otherDoc };
        }),
    resetXmlDocToWholeFile: () =>
        set((state) => {
            console.log("RESETTING XML DOC--");
            return {
                ...state,
                xmlDoc: parser.parseFromString(state.xmlfile, "text/xml"),
            };
        }),

    setParticipant: (p) =>
        set((state) => {
            if (p.processRef === "") {
                const xmlDoc = parser.parseFromString(
                    state.xmlfile,
                    "text/xml"
                );
                return { ...state, xmlDoc, currentSelectedParticipant: p };
            }
            const xmlDocOfParticipant = getProcessXmlDocWithRefAttr(
                state.xmlDoc,
                p.processRef
            );
            return {
                ...state,
                currentSelectedParticipant: p,
                xmlDoc: xmlDocOfParticipant,
            };
        }),
    changeXmlFile: (s) =>
        set((state) => {
            const xmlDoc = new DOMParser().parseFromString(s, "text/xml");
            return {
                ...state,
                xmlfile: s,
                currentSelectedParticipant: { name: "", processRef: "" },
                xmlDoc,
            };
        }),
    updateXmlFile: (file) =>
        set((state) => {
            //setting xmlDoc to that of the current participant(i need to reparse it because he might just be changing participants)

            if (!file) return { ...state, xmlDoc: new Document() };

            //parser.parseFromString(file, "text/xml");
            const xmlDoc = new DOMParser().parseFromString(file, "text/xml");
            if (!state.currentSelectedParticipant.name) {
                return { ...state, xmlfile: file, xmlDoc };
            }

            const xmlDocOfParticipant = getProcessXmlDocWithRefAttr(
                xmlDoc,
                state.currentSelectedParticipant.processRef
            );
            return { ...state, xmlfile: file, xmlDoc: xmlDocOfParticipant };
        }),
}));

export default useStore;
