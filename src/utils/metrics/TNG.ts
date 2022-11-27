import { countStructuralElements } from "./utils";
import { CalculateMetricFn } from "./utils";
const TNG: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //!not the best way will remove
    const xmlElementsCount = countStructuralElements(xmlDoc);
    const result = Array.from(xmlElementsCount.keys()).reduce(
        (total, currentbpmnElement) => {
            if (currentbpmnElement.endsWith("Gateway")) {
                total += xmlElementsCount.get(currentbpmnElement) as number;
            }
            return total;
        },
        0
    );

    return result;
};

export default TNG;
