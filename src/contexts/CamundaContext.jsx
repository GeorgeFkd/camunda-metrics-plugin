import React from "camunda-modeler-plugin-helpers/react";
const CamundaContext = React.createContext({
    subscribeToCamundaEvent: () => {},
    triggerAction: () => {},
});

export default CamundaContext;
