import React from "react";

import styles from "./MetricsTable.css";
import CamundaContext from "../../contexts/CamundaContext";
import CustomOverlay from "../ModifyGroupsOverlay";
import CopyResultsButton from "./CopyResultsButton";
import SelectSubProcessOverlay from "./SelectSubprocessOverlay";
import { getParticipants } from "../../utils/metrics/utils";
import useStore from "../../store/store";
import MetricGroupsTable from "./MetricGroupsTable";
const MemoizedTable = React.memo(MetricGroupsTable);

function MetricsTable() {

    // const [xmlDoc, setXmlDoc] = React.useState<Document>(new Document());
    //const xmlFile = useXmlFile();
    const xmlDoc = useStore((state)=>state.xmlDoc);
    const updateGroups = useStore((state)=>state.updateGroups)
    const metricGroups = useStore((state)=>state.metricGroups)
    const setParticipant = useStore((state)=>state.setParticipant)
    const { triggerCamundaAction } = 
        React.useContext(CamundaContext)
    const [configOpen, setConfigOpen] = React.useState(false);
    const [selectProcessOpen,setSelectProcessOpen] = React.useState(false);
    const configGroupsBtnRef = React.useRef<HTMLButtonElement>(null);
    const selectSubProcessRef = React.useRef<HTMLButtonElement>(null);
    console.log("I RERENDER METRICS TABLE")
    React.useEffect(()=>{
        triggerCamundaAction("save")
    },[])
    const participants = getParticipants(xmlDoc)
    return (
        <div className={styles.metricsContainer}>
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
             <CopyResultsButton metricGroups={metricGroups}/>
             <button className='btn btn-primary' ref={selectSubProcessRef} onClick={()=>setSelectProcessOpen(isOpen=>!isOpen)}>Select Pool</button>
             {selectProcessOpen && (
                <SelectSubProcessOverlay anchor={selectSubProcessRef.current} onClose={()=>setSelectProcessOpen(false)} onSubmit={setParticipant} options={participants}/>
             )}
                </div>
            
            <MemoizedTable metricGroups={metricGroups}/>
            
        </div>
    );
}

function MetricsTableTitle({}) {
    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}

export default MetricsTable;
