import React from "camunda-modeler-plugin-helpers/react";
const CamundaContext = React.createContext({
    subscribeToCamundaEvent: () => {},
});

export default CamundaContext;
