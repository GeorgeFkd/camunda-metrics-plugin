import React from "react";

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
}
const CamundaContext = React.createContext({
    // subscribeToCamundaEvent: () => {},
    // triggerAction: () => {},
} as ICamundaContext);

export default CamundaContext;
