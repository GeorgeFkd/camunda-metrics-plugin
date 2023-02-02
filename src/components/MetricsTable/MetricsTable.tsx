import React from "react";
import { MetricGroup } from "../../assets/typed-constants";
import CATEGORIES_WITH_METRICS from "../../utils/metrics/init_metrics";
import useSubscribe from "../../hooks/useSubscribe";
import styles from "./MetricsTable.css";
import CamundaContext from "../../contexts/CamundaContext";
import { DOMParser } from "xmldom";
import MetricGroupContainer from "./MetricGroupContainer";
import CustomOverlay from "../ModifyGroupsOverlay";
import CopyResultsButton from "./CopyResultsButton";
import useXmlFile from "../../hooks/useXmlFile";
import SelectSubprocessButton from "./SelectSubprocessButton";
import SelectSubProcessOverlay from "./SelectSubprocessOverlay";
import { getParticipants, getProcessWithRefAttr } from "../../utils/metrics/utils";
const parser = new DOMParser();
function MetricsTable() {

    // const [xmlDoc, setXmlDoc] = React.useState<Document>(new Document());
    const xmlFile = useXmlFile();
    const { triggerCamundaAction } = 
        React.useContext(CamundaContext)
    const [metricGroups,setMetricGroups] = React.useState(CATEGORIES_WITH_METRICS)
    const [configOpen, setConfigOpen] = React.useState(false);
    const [selectProcessOpen,setSelectProcessOpen] = React.useState(false);
    const configGroupsBtnRef = React.useRef<HTMLButtonElement>(null);
    const selectSubProcessRef = React.useRef<HTMLButtonElement>(null);
    const [participant,setParticipant] = React.useState("")
    let xmlDoc:Document;
    //const xmlDoc = xmlFile ? parser.parseFromString(xmlFile,"text/xml") : new Document();
    if(participant == ""){
        //oloklhro 
        console.log("We keep the whole one")
        xmlDoc = xmlFile ? parser.parseFromString(xmlFile,"text/xml") : new Document();
    }else{
        console.log("We zoom in on participant")
        const wholeDoc = xmlFile ? parser.parseFromString(xmlFile,"text/xml") : new Document();
        xmlDoc = getProcessWithRefAttr(wholeDoc,participant)
    }
    //const [xmlDoc,setXmlDoc] = React.useState<Document>(new Document());
    React.useEffect(()=>{
        triggerCamundaAction("save")
        
        //setXmlDoc(doc)
    },[])
    function updateGroups(newGroups:MetricGroup[]){
        setMetricGroups(newGroups)
    }

    function setXmlToParticipant(processRef:string){
        //setXmlDoc(getProcessWithRefAttr(parser.parseFromString(xmlFile),processRef))
    }

    
    console.log("The Xml Doc is",xmlDoc)
    
    
    console.log("the currently selected participant is:",participant)
    const participants = getParticipants(xmlDoc)
    return (
        <div className={styles.metricsContainer}>
            {/*TODO-> PUT HEADER HERE THAT CONTAINS THE TITLE THE CONFIGURE GROUPS AND THE COPY TO CLIPBOARD */}
            <div className={styles.metricsHeader}>
            
            <MetricsTableTitle />
            <button
                ref={configGroupsBtnRef}
                onClick={() => setConfigOpen((prev: boolean) => !prev)}
                className="btn btn-primary"
                >
                Configure Groups
            </button>
            {configOpen && (
                <CustomOverlay
                    anchor={configGroupsBtnRef.current}
                    existingGroups={metricGroups}
                    onClose={() => setConfigOpen(false)}
                    onSubmit={updateGroups}
                />
            )}
             <CopyResultsButton xmlDoc={xmlDoc} metricGroups={metricGroups}/>
             <button className='btn btn-primary' ref={selectSubProcessRef} onClick={()=>setSelectProcessOpen(isOpen=>!isOpen)}>Select Subprocess</button>
             {selectProcessOpen && (
                <SelectSubProcessOverlay anchor={selectSubProcessRef.current} onClose={()=>setSelectProcessOpen(false)} onSubmit={(processRef:string)=>setParticipant(processRef)} options={participants}/>
             )}
                </div>
            

            <div className={styles.metricsTable}>
                {/* this will soon be context */}
                {metricGroups.map((MetricGroup:MetricGroup) => {
                    return (
                        <MetricGroupContainer
                            metricGroup={MetricGroup}
                            xmlDoc={xmlDoc}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function MetricsTableTitle({}) {
    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}

//for categoriescontainer and metricscontainer
const RemoveElementBtn = ({ onClickFn }: { onClickFn: () => void }) => {
    return (
        <button className="metrics-wrapper-title-remove" onClick={onClickFn}>
            X
        </button>
    );
};

export default MetricsTable;
