import React from "react";

import styles from "./MetricsTable.css";
import CamundaContext from "../../contexts/CamundaContext";
import CustomOverlay from "./MetricsTableHeader/ConfigureGroups/ModifyGroupsOverlay";
import CopyResultsButton from "./MetricsTableHeader/CopyResultsButton";
import SelectSubProcessOverlay from "./MetricsTableHeader/SelectSubprocess/SelectSubprocessOverlay";
import { getParticipants } from "../../utils/metrics/utils";
import useStore from "../../store/store";
import MetricGroupsTable from "./MetricGroupsTable";
import MetricsTableHeader from "./MetricsTableHeader";
// const MemoizedTable = React.memo(MetricGroupsTable);

function MetricsTable() {

    // const [xmlDoc, setXmlDoc] = React.useState<Document>(new Document());
    //const xmlFile = useXmlFile();
    const metricGroups = useStore((state)=>state.metricGroups)
    const { triggerCamundaAction } = 
        React.useContext(CamundaContext)
    React.useEffect(()=>{
        triggerCamundaAction("save")
    },[])
    return (
        <div className={styles.metricsContainer}>
            <MetricsTableHeader />           
            <MetricGroupsTable metricGroups={metricGroups}/>
        </div>
    );
}

function MetricsTableTitle({}) {
    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}

export default MetricsTable;
