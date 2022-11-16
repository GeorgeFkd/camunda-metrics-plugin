export const BPMN_ELEMENTS = {
    XOR: "exclusiveGateway",
    OR: "inclusiveGateway",
    AND: "parallelGateway",
};

//ideally an enum
export const RESEQ_EVALUATIONS = [
    "very inefficient",
    "rather inefficient",
    "moderately inefficient",
    "moderately efficient",
    "rather efficient",
    "very efficient",
];

export const PAR_EVALUATIONS = [
    "very inefficient",
    "rather inefficient",
    "moderately inefficient",
    "moderately efficient",
    "rather efficient",
    "very efficient",
];
export const MODIFIABILITY_EVALUATIONS = [
    "very difficult to modify",
    "difficult to modify",
    "moderately modifiable",
    "easy to modify",
    "very easy to modify",
];

export const CATEGORIES = {
    PLASTICITY: "PLASTICITY",
    RESEQ: "RESEQ",
    PAR: "PAR",
    MODIFIABILITY: "MODIFIABILITY",
    CORRECTNESS: "CORRECTNESS",
};

export const CORRECTNESS_EVALUATIONS = ["has errors", "error free"];

//ti tha kanw me poio complex elements?
//needs a bpmn-icon- prefix dont forget
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
