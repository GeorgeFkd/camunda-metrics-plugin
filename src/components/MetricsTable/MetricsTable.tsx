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
    const { triggerCamundaAction } = React.useContext(CamundaContext);
    React.useEffect(() => {
        //This seems to be needed to update the metrics properly
        //when opening the metrics table, remove it if there is a way to do so.
        triggerCamundaAction("save");
    }, []);
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
