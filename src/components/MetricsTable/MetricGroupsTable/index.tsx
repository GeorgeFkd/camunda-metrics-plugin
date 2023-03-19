import React from "react";
import { MetricGroup } from "../../../assets/typed-constants";
import MetricGroupContainer from "../MetricGroupContainer";
import styles from "./MetricGroupsTable.css";
import useStore from "../../../store/store";

interface IMetricGroupsTableProps {
    metricGroups: MetricGroup[];
}

function MetricGroupsTable({ metricGroups }: IMetricGroupsTableProps) {
    const xmlDoc = useStore((state) => state.xmlDoc);
    return (
        <div className={styles.metricsTable}>
            {/* metricGroups are also included in the global state could change this */}
            {metricGroups.map((MetricGroup: MetricGroup) => {
                return (
                    <MetricGroupContainer
                        metricGroup={MetricGroup}
                        xmlDoc={xmlDoc}
                    />
                );
            })}
        </div>
    );
}

export default MetricGroupsTable;
