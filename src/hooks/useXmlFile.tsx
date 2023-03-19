// import React from "camunda-modeler-plugin-helpers/react";
import React from "react";
import useSubscribe from "./useSubscribe";
import useStore from "../store/store";

export default function useXmlFile() {
    //There is a difference between updating a file and changing it
    //When changing xml file the participant must be updated to empty
    //When updating the existing one, this should not happen
    const updateXmlFile = useStore((state) => state.updateXmlFile);
    const changeXmlFile = useStore((state) => state.changeXmlFile);
    useSubscribe("tab.saved", (dataFromEvent) => {
        if (dataFromEvent.tab.type === "empty") return;
        console.log("SUBSCRIBE SUCCESSFULL");
        updateXmlFile(dataFromEvent.tab.file.contents);
    });
    useSubscribe("app.activeTabChanged", (dataFromEvent) => {
        if (dataFromEvent.activeTab.type === "empty") return;
        console.log("SUBSCRIBE SUCCESSFULL");
        changeXmlFile(dataFromEvent.activeTab.file.contents);
    });
    return;
}
