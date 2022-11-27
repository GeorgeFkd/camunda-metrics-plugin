import { CalculateMetricFn, elementNameIsConsideredActivity } from "./utils";
import xpath from "xpath";
const NSFA: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //the problem with boundaryEvents
    //they are events not tasks so?
    //(kapoy exw kanei to assumption oti feugei
    //mono ena sequenceFlow apo to task kai checkarw mono auto)
    //ta message flows metrane san sequence flows?
    const allSFs = xpath.select(
        "//*[local-name()='sequenceFlow']",
        xmlDoc
    ) as Node[];
    console.log("THE SFs", allSFs);

    const sum = allSFs.reduce((total, current) => {
        const [sourceRef, targetRef] = xpath.select(
            "./@*[matches(local-name(),'(source|target)Ref')]",
            current
        ) as Node[];
        console.log(sourceRef, targetRef);
        //these are on the total xmlDoc
        const sourceNodes = xpath.select(
            `//*[@id='${sourceRef.nodeValue}']`,
            xmlDoc
        ) as Node[];
        const targetNodes = xpath.select(
            `//*[@id='${targetRef.nodeValue}']`,
            xmlDoc
        ) as Node[];
        if (sourceNodes.length === 0 || targetNodes.length === 0) return total;

        const sourceNode = sourceNodes[0];
        const targetNode = targetNodes[0];
        console.log(sourceNode, targetNode);
        if (
            elementNameIsConsideredActivity(
                sourceNode.nodeName.replace(/.+:/, "")
            ) &&
            elementNameIsConsideredActivity(
                targetNode.nodeName.replace(/.+:/, "")
            )
        ) {
            console.log("we add it ");
            return (total += 1);
        }
        return total;
    }, 0);

    return sum;
};

export default NSFA;
