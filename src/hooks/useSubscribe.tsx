import React from "camunda-modeler-plugin-helpers/react";

import CamundaContext from "../contexts/CamundaContext";

export default function useSubscribe(event:string,action:(eventData:any)=>void){
    const {subscribeToCamundaEvent} = React.useContext(CamundaContext);
    console.log("The context: ",React.useContext(CamundaContext))
    //i gotta find a way to unsubscribe
    React.useEffect(()=>{subscribeToCamundaEvent(event,(eventArgs:any)=>{
        console.info("For event: ",event,"Calling FN: ",action);
        action(eventArgs);
    })},[])
   
    //what to return
}