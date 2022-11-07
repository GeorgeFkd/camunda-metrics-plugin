import xpath from "xpath";
import { DOMParser } from "xmldom";
import {
    AGD_OF_Diagram,
    CFC_OF_DIAGRAM,
    CLA_OF_Diagram,
    GH_OF_Diagram,
    GH_OF_Gate,
    GM_OF_Diagram,
    MGD_OF_Diagram,
    NoAJS_OF_Diagram,
    NoA_OF_Diagram,
    NSFA_OF_Diagram,
    NSFG_OF_Diagram,
    TNG_OF_Diagram,
    TS_OF_Diagram,
} from "./calculateAllMetrics";

//genika yparxoyn kapoies idiaiterothtes tou typou intermediate throw event einai kai to aplo
//kyklaki kai molis tou valeis ena messageEvent apo mesa ginetai me to envelope
//kai ta tasks perissotera for some reason ama exoun kai service allazei to tag opote gotta factor this in

//TODO convert xml element names to human readable names -> with an object

const parser = new DOMParser();

export function analyzeXMLString(xmlStr) {
    if (!xmlStr) {
        return new Map();
    }
    const xmlDoc = parser.parseFromString(xmlStr);
    let allEls = xpath.select("//*", xmlDoc);

    let elNames = allEls.map((el) => el.localName);

    let distinctElemsInBpmnDiagram = new Set(elNames);

    let result = BpmnTagsCountOccurences(distinctElemsInBpmnDiagram, elNames);
    //nomizw kalytera sto ui gia na mhn kanw teleiws remove pragmata apla na ta emfanizw kai na ta kryvw
    return result;
}

function BpmnTagsCountOccurences(uniqueTagsInDiagram, allTags) {
    if (!uniqueTagsInDiagram) {
        return new Map();
    }
    let result = new Map();
    uniqueTagsInDiagram.forEach((tagName) => {
        let elems = allTags.filter((name) => {
            return name === tagName;
        });
        //here i can get any edge cases
        if (tagName === "subProcess") {
            result.set(tagName, elems.length / 2);
        } else {
            result.set(tagName, elems.length);
        }
    });
    return result;
}

export default function calculateAllMetrics(xmlStr) {
    // const data = analyzeXMLString(xmlStr); for less calculations later
    let computedMetricsMap = new Map();
    computedMetricsMap.set("AGD", AGD_OF_Diagram(xmlStr).toFixed(2));
    computedMetricsMap.set("MGD", MGD_OF_Diagram(xmlStr));
    computedMetricsMap.set("NSFA", NSFA_OF_Diagram(xmlStr));
    computedMetricsMap.set("NOA", NoA_OF_Diagram(xmlStr));
    computedMetricsMap.set("NOAJS", NoAJS_OF_Diagram(xmlStr));
    computedMetricsMap.set("NSFG", NSFG_OF_Diagram(xmlStr));
    computedMetricsMap.set("CLA", CLA_OF_Diagram(xmlStr).toFixed(2));
    //computedMetricsMap.set("GH_XOR", GH_OF_Gate(xmlStr, "exclusiveGateway"));
    //computedMetricsMap.set("GH_OR", GH_OF_Gate(xmlStr, "inclusiveGateway"));
    //computedMetricsMap.set("GH_AND", AGD_OF_Diagram(xmlStr));
    //computedMetricsMap.set("GH", GH_OF_Diagram(xmlStr));
    computedMetricsMap.set("TS", TS_OF_Diagram(xmlStr));
    computedMetricsMap.set("GM", GM_OF_Diagram(xmlStr));
    computedMetricsMap.set("CFC", CFC_OF_DIAGRAM(xmlStr));
    computedMetricsMap.set("TNG", TNG_OF_Diagram(xmlStr));
    return computedMetricsMap;
}
console.log("HERE CMON");
