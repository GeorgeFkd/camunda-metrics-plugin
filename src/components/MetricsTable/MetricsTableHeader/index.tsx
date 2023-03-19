import React from "react";
import styles from "./MetricsTableHeader.css";
import CopyResultsButton from "./CopyResultsButton";
import useStore from "../../../store/store";
import SelectSubprocess from "./SelectSubprocess";
import ConfigureGroups from "./ConfigureGroups";
function MetricsTableHeader() {
    const metricGroups = useStore((state) => state.metricGroups);
    return (
        <div className={styles.metricsHeader}>
            <MetricsTableTitle />
            <ConfigureGroups />
            <CopyResultsButton metricGroups={metricGroups} />
            <SelectSubprocess />
        </div>
    );
}
function MetricsTableTitle({}) {
    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}
export default MetricsTableHeader;
