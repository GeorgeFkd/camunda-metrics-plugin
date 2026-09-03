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

function MetricsTable() {
    const metricGroups = useStore((state) => state.metricGroups);
    //NOTE: this component used to call triggerCamundaAction("save") on mount to
    //force fresh XML. That writes the file to disk and runs post-save hooks
    //(file indexer + Zeebe connection check) on every open, which froze the UI.
    //XML is now kept current via subscriptions in MetricsPlugin instead.
    return (
        <div className={styles.metricsContainer}>
            <MetricsTableHeader />
            <MetricGroupsTable metricGroups={metricGroups} />
        </div>
    );
}

function MetricsTableTitle({}) {
    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}

export default MetricsTable;
