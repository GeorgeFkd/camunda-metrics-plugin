import { create } from "zustand";
import { MetricGroup } from "../assets/typed-constants";

interface State {
    xmlfile: string;
    xmlDoc: Document;
    metricGroups: MetricGroup[];
    //probably not string
    structuralElementsTracked: string;
}

interface Actions {
    setXmlFile: (s: string) => void;
    setCurrentXmlDoc: (d: Document) => void;
    addMetricGroup: (m: MetricGroup) => void;
    updateGroups: (mgroups: MetricGroup[]) => void;
    updateStructuralElementsTracked: (elems: string[]) => void;
}

// const useStore = create<State & Actions>()((set) => ({
//     xmlfile:"",
//     metricGroups:[],
//     setCurrentXmlDoc(d) {
//         return;
//     },
//     xmlDoc:new Document(),
//     addMetricGroup(m) {
//         return ;
//     },
//     setXmlFile(s) {
//         return ;
//     },
//     updateGroups
// }));
const useStore = create()((set) => ({}));

export default useStore;
