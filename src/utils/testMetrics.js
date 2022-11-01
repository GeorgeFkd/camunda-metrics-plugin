import * as BpmnMetrics from "./metrics";
import { xmlString as xmlStr } from "./bpmn-sample";
import { analyzeXMLString } from "./analyzeXMLString";
//BpmnMetrics.numberOfActivitiesMetric

function testNumberOfActivitiesMetric(data) {}
//BpmnMetrics.numberOfEvents
//name TNE(Total Number of Events)
function testNumberOfEvents(data) {}

//BpmnMetrics.numberOfEndEvents
//name TNEE(Total Number of End Events)
function testNumberOfEndEvents(data) {}

//BpmnMetrics.numberOfStartEvents
//name TNSE(Total Number of Start Events)
function testNumberOfStartEvents(data) {}

//BpmnMetrics.numberOfGateways
//name
function testNumberOfGateways(data) {}

//mporei kai na mhn xreiazetai to export
// console.log(xmlStr);
export default function runTests() {
    const data = analyzeXMLString(xmlStr);
    console.log(
        "Number of activities metric passes: ",
        BpmnMetrics.numberOfActivitiesMetric(data) === 20
    );
    console.log(
        "Number of end events passes: ",
        BpmnMetrics.numberOfEndEvents(data) === 1
    );
    console.log(
        "Number of start events passes: ",
        BpmnMetrics.numberOfStartEvents(data) === 1
    );
    console.log(
        "Number of types of gateways passes: ",
        BpmnMetrics.numberOfGatewayTypes(data) === 3
    );
    console.log(
        "Number of Gateways passes: ",
        BpmnMetrics.numberOfGateways(data) === 6
    );
}

// runTests(data)
