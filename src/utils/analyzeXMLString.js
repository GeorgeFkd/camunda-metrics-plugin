import xpath from "xpath";
import { DOMParser } from "xmldom";

//genika yparxoyn kapoies idiaiterothtes tou typou intermediate throw event einai kai to aplo
//kyklaki kai molis tou valeis ena messageEvent apo mesa ginetai me to envelope
//kai ta tasks perissotera for some reason ama exoun kai service allazei to tag opote gotta factor this in

//TODO convert xml element names to human readable names -> with an object

//console.log(xpath.select("//*[local-name()='exclusiveGateway']", xmlDoc));
let gateways = xpath.select("//*[local-name()='exclusiveGateway']", xmlDoc);
//! console.log(gateways);
//! gateways.forEach((gate) =>
//!     console.log(
//!         xpath.select("count(self::node()/*[local-name()='outgoing'])", gate)
//!    )
//! );

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
    //TODO make user able to ignore certain elements [will this be done on the ui side or the backend side]
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
