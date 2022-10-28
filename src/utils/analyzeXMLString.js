import xpath from "xpath";
import { DOMParser } from "xmldom";

//genika yparxoyn kapoies idiaiterothtes tou typou intermediate throw event einai kai to aplo
//kyklaki kai molis tou valeis ena messageEvent apo mesa ginetai me to envelope
//kai ta tasks perissotera for some reason ama exoun kai service allazei to tag opote gotta factor this in

//TODO convert xml element names to human readable names -> with an object

const parser = new DOMParser();
export function analyzeXMLString(xmlStr) {
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
    let result = new Map();
    uniqueTagsInDiagram.forEach((tagName) => {
        let elems = allTags.filter((name) => {
            return name === tagName;
        });
        result.set(tagName, elems.length);
    });
    return result;
}
