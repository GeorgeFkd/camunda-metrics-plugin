import { DOMParser } from "xmldom";
import { BPMN_ELEMENTS } from "./constants";

export const MAP_BPMN_ELEMENTS_TO_ICON_CLASSES = {
    exclusiveGateway: "gateway-xor",
    inclusiveGateway: "gateway-or",
    parallelGateway: "gateway-parallel",
    eventBasedGateway: "gateway-eventbased",
    complexGateway: "gateway-complex",
    intermediateEvent: "intermediate-event-none",
    endEvent: "end-event-none",
    startEvent: "start-event-none",
    // diafora task me task-none
    task: "task",
    sequenceFlow: "connection",
    manualTask: "manual",
    userTask: "user",
    businessRuleTask: "business-rule",
    terminateEventDefinition: "end-event-terminate",
    serviceTask: "service",
    scriptTask: "script",
};

export const bpmnElementsDisplayed = [
    {
        iconClassname: "bpmn-icon-gateway-xor",
        xmlTagName: BPMN_ELEMENTS.XOR,
        order: 4,
    },
    {
        iconClassname: "bpmn-icon-gateway-parallel",
        xmlTagName: BPMN_ELEMENTS.AND,
        order: 6,
    },
    {
        iconClassname: "bpmn-icon-gateway-or",
        xmlTagName: BPMN_ELEMENTS.OR,
        order: 5,
    },
    // {
    //     iconClassname: "bpmn-icon-gateway-eventbased",
    //     xmlTagName: BPMN_ELEMENTS.EVENT_BASED,
    //     order: 1,
    // },
    {
        iconClassname: "bpmn-icon-task",
        xmlTagName: BPMN_ELEMENTS.TASK,
        order: 1,
    },
    {
        iconClassname: "bpmn-icon-manual",
        xmlTagName: BPMN_ELEMENTS.MANUAL_TASK,
        order: 2,
    },
    {
        iconClassname: "bpmn-icon-connection",
        xmlTagName: BPMN_ELEMENTS.SEQUENCE_FLOW,
        order: 3,
    },
    {
        iconClassname: "bpmn-icon-service",
        xmlTagName: BPMN_ELEMENTS.SERVICE_TASK,
        order: 9,
    },
    {
        iconClassname: "bpmn-icon-script",
        xmlTagName: BPMN_ELEMENTS.SCRIPT_TASK,
        order: 10,
    },
    {
        iconClassname: "bpmn-icon-business-rule",
        xmlTagName: BPMN_ELEMENTS.BUSINESS_RULE_TASK,
        order: 8,
    },
    {
        iconClassname: "bpmn-icon-user",
        xmlTagName: BPMN_ELEMENTS.USER_TASK,
        order: 7,
    },
    {
        iconClassname: "bpmn-icon-participant",
        xmlTagName: BPMN_ELEMENTS.POOL,
        order: 11,
    },
    {
        iconClassname: "bpmn-icon-data-object",
        xmlTagName: BPMN_ELEMENTS.DATA_OBJECT,
        order: 12,
    },
];

export const parser = new DOMParser();
