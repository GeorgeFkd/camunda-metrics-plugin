import Metric from "./Metric-Class";
import { CalculateMetricFn } from "./utils";
import { countStructuralElements as analyzeXMLString } from "./utils";
const NOA: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    //!this is temporary-> it wastes resources
    //!correct
    const data = analyzeXMLString(xmlDoc);
    const allTypesOfTasks = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.toLowerCase().includes("task");
    });
    //ta subprocesses metrane sa task h oxi? gt ena mpainei panw kai ena otan to kaneis expand
    //epishs ta callActivity einai diaforetika
    //prepei na ta kanw include
    const result = allTypesOfTasks.reduce((total, value) => {
        return (total += data.get(value) as number);
    }, 0);
    return result;
};

const NOAObj = new Metric("NOA", -1, NOA, ["Activities"]);
export default NOAObj;
