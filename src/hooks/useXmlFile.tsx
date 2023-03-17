// import React from "camunda-modeler-plugin-helpers/react";
import React from "react"
import useSubscribe from "./useSubscribe";
import useStore from "../store/store";

export default function useXmlFile(){
    //there might be a hit of performance i need to test it properly before pulling
    //const [xmlFile,setXmlFile] = React.useState<string>("");
    // const setXmlFile = useStore((state)=>state.setXmlFile)
    const updateXmlFile = useStore((state)=>state.updateXmlFile)
    const changeXmlFile = useStore((state)=>state.changeXmlFile)
    useSubscribe("tab.saved", (dataFromEvent) => {
        if (dataFromEvent.tab.type === "empty") return;
        console.log("SUBSCRIBE SUCCESSFULL")
        updateXmlFile(dataFromEvent.tab.file.contents);
    });
    useSubscribe("app.activeTabChanged", (dataFromEvent) => {
        if (dataFromEvent.activeTab.type === "empty") return;
        console.log("SUBSCRIBE SUCCESSFULL")
        changeXmlFile(dataFromEvent.activeTab.file.contents);
    });
    return ;
}