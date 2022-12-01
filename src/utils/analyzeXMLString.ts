// import xpath from "xpath";
import * as Metrics from "./metrics/all";
console.log(Metrics, "tng is real");
//import { select } from "xpath";
import { countStructuralElements as analyzeXMLString } from "./metrics/utils";
import { DOMParser } from "xmldom";
// import {
//     AGD_OF_Diagram,
//     CFC_OF_DIAGRAM,
//     CLA_OF_Diagram,
//     GH_OF_Diagram,
//     GM_OF_Diagram,
//     MGD_OF_Diagram,
//     NoAJS_OF_Diagram,
//     NoA_OF_Diagram,
//     NSFA_OF_Diagram,
//     NSFG_OF_Diagram,
//     //TNG_OF_Diagram,
//     TS_OF_Diagram,
// } from "./calculateAllMetrics";

//genika yparxoyn kapoies idiaiterothtes tou typou intermediate throw event einai kai to aplo
//kyklaki kai molis tou valeis ena messageEvent apo mesa ginetai me to envelope
//kai ta tasks perissotera for some reason ama exoun kai service allazei to tag opote gotta factor this in

//TODO convert xml element names to human readable names -> with an object

const parser = new DOMParser();
export default function calculateAllMetrics(
    xmlStr: string
): Map<string, number | Map<string, number> | string> {
    //so we dont parse inside every function
    //!optimisation wise it gets it below 200ms
    const parsedXmlDocument = parser.parseFromString(xmlStr);
    let computedMetricsMap = new Map<
        string,
        number | Map<string, number> | string
    >();

    //! this stays?
    computedMetricsMap.set(
        "XML DATA COUNT",
        analyzeXMLString(parsedXmlDocument)
    );
    // computedMetricsMap.set("AGD", Metrics.AGD(parsedXmlDocument).toFixed(2));
    // computedMetricsMap.set("MGD", Metrics.MGD(parsedXmlDocument));
    // computedMetricsMap.set("NSFA", Metrics.NSFA(parsedXmlDocument));
    // computedMetricsMap.set("NOA", Metrics.NOA(parsedXmlDocument));
    // computedMetricsMap.set("NOAJS", Metrics.NOAJS(parsedXmlDocument));
    // computedMetricsMap.set("NSFG", Metrics.NSFG(parsedXmlDocument));
    // computedMetricsMap.set("CLA", Metrics.CLA(parsedXmlDocument).toFixed(2));
    // computedMetricsMap.set("GH", Metrics.GH(parsedXmlDocument).toFixed(2));
    // computedMetricsMap.set("TS", Metrics.TS(parsedXmlDocument));
    // computedMetricsMap.set("GM", Metrics.GM(parsedXmlDocument));
    // computedMetricsMap.set("CFC", Metrics.CFC(parsedXmlDocument));
    // computedMetricsMap.set("TNG", Metrics.TNG(parsedXmlDocument));
    return computedMetricsMap;
}
console.log("HERE CMON");
