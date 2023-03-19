import { countStructuralElements as analyzeXMLString } from "./metrics/utils";
import { DOMParser } from "@xmldom/xmldom";

//There are some intricacies in what elements are considered what

//TODO convert xml element names to human readable names -> with an object

const parser = new DOMParser();
export default function calculateAllMetrics(
    xmlStr: string
): Map<string, number | Map<string, number> | string> {
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
    return computedMetricsMap;
}
