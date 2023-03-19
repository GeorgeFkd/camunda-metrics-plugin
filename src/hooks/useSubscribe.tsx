import React from "camunda-modeler-plugin-helpers/react";

import CamundaContext from "../contexts/CamundaContext";

//The any type is used because the eventArgs are not known
export default function useSubscribe(
    event: string,
    action: (eventData: any) => void
) {
    const { subscribeToCamundaEvent } = React.useContext(CamundaContext);
    console.log("The context: ", React.useContext(CamundaContext));
    //TODO: find a way to unsubscribe, it has not caused any problems yet
    React.useEffect(() => {
        subscribeToCamundaEvent(event, (eventArgs: any) => {
            console.info("For event: ", event, "Calling FN: ", action);
            action(eventArgs);
        });
    }, []);
}
