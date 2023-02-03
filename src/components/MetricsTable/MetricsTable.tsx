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
import { getParticipants, getProcessXmlDocWithRefAttr } from "../../utils/metrics/utils";
import useStore from "../../store/store";
import MetricGroupsTable from "./MetricGroupsTable";
const parser = new DOMParser();
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
             <CopyResultsButton metricGroups={metricGroups}/>
             <button className='btn btn-primary' ref={selectSubProcessRef} onClick={()=>setSelectProcessOpen(isOpen=>!isOpen)}>Select Pool</button>
             {selectProcessOpen && (
                <SelectSubProcessOverlay anchor={selectSubProcessRef.current} onClose={()=>setSelectProcessOpen(false)} onSubmit={setParticipant} options={participants}/>
             )}
                </div>
            {/* probably could use memo */}
            {/* <MetricGroupsTable metricGroups={metricGroups} xmlDoc={xmlDoc}/> */}
            <MemoizedTable metricGroups={metricGroups}/>
            
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
