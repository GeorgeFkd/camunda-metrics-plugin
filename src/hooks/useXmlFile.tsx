// import React from "camunda-modeler-plugin-helpers/react";
import React from "react"
import useSubscribe from "./useSubscribe";


export default function useXmlFile(){
    const [xmlFile,setXmlFile] = React.useState<string>("");
    useSubscribe("tab.saved", (dataFromEvent) => {
        if (dataFromEvent.tab.type === "empty") return;
        setXmlFile(dataFromEvent.tab.file.contents);
    });
    useSubscribe("app.activeTabChanged", (dataFromEvent) => {
        if (dataFromEvent.activeTab.type === "empty") return;
        setXmlFile(dataFromEvent.activeTab.file.contents);
    });
    return xmlFile;
}