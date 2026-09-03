import React from "camunda-modeler-plugin-helpers/react";

import CamundaContext from "../contexts/CamundaContext";

//The any type is used because the eventArgs are not known
export default function useSubscribe(
    event: string,
    action: (eventData: any) => void
) {
    const { subscribeToCamundaEvent } = React.useContext(CamundaContext);

    //keep the latest callback without forcing a re-subscribe on every render
    const actionRef = React.useRef(action);
    React.useEffect(() => {
        actionRef.current = action;
    });

    React.useEffect(() => {
        if (typeof subscribeToCamundaEvent !== "function") return;

        const subscription = subscribeToCamundaEvent(
            event,
            (eventArgs: any) => {
                actionRef.current(eventArgs);
            }
        );

        //Camunda Modeler's subscribe() returns { cancel }. Without this the
        //listener stays registered forever and stacks up every time the
        //Metrics panel is re-opened, which freezes the app.
        return () => {
            if (subscription && typeof subscription.cancel === "function") {
                subscription.cancel();
            }
        };
    }, [event, subscribeToCamundaEvent]);
}
