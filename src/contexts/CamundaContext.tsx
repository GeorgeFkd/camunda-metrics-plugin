import React from "camunda-modeler-plugin-helpers/react"; 
type eventListenerFn = (eventArgs:any)=>void
//i cant type it due to the React.createContext = any
interface CamundaContextType {subscribeToCamundaEvent:(event:string,fn:eventListenerFn)=>void,triggerAction:(event:string)=>void}
const CamundaContext = React.createContext(null);

export default CamundaContext;
