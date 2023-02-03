import React from "camunda-modeler-plugin-helpers/react";

import { MetricGroup } from "../../../assets/typed-constants";
import MetricLabel from "../MetricLabel";
import styles from "./MetricGroupContainer.css"
interface MetricGroupContainerProps {
    metricGroup: MetricGroup;
    xmlDoc: Document;
}
const MetricGroupContainer = ({
    metricGroup,
    xmlDoc,
}: MetricGroupContainerProps) => {
    return (
        <div className={styles.metricsWrapper} style={{ height: "195px" }}>
            <div className={styles.metricsWrapperTitle}>
                <span className={styles.metricsWrapperTitleName}>
                    {metricGroup.name}
                </span>
            </div>
            <div className={`${styles.metricsWrapperChildren}`}>
                {metricGroup.metrics.map((metric) => (
                    <MetricLabel metric={metric} xmlDoc={xmlDoc} />
                ))}
            </div>
        </div>
    );
};

export default MetricGroupContainer;