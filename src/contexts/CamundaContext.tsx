import React from "react";
import { ModelerConfig } from "../utils/metricConfigStorage";

interface NotificationProps {
    title: string;
    type: string;
    content: string;
    duration: number;
}

interface ICamundaContext {
    subscribeToCamundaEvent: () => void;
    triggerCamundaAction: (actionName: string) => void;
    displayNotification: ({title,type,content,duration}:NotificationProps) => void;
    //Camunda Modeler's config store, used to persist the selected metric groups
    //(see utils/metricConfigStorage). May be undefined on very old Modelers.
    config?: ModelerConfig;
}
const CamundaContext = React.createContext({
    // subscribeToCamundaEvent: () => {},
    // triggerAction: () => {},
} as ICamundaContext);

export default CamundaContext;
