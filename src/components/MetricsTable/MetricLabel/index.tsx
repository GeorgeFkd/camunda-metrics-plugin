import React from "camunda-modeler-plugin-helpers/react";
import Metric from "../../../utils/metrics/Metric-Class";
import { Spinner } from "../../Spinner";
import styles from "./MetricLabel.css";

const MetricLabel = ({
    metric,
    xmlDoc,
}: {
    metric: Metric;
    xmlDoc: Document;
}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [result, setResult] = React.useState(metric.result);
    React.useEffect(() => {
        //Other methods have not worked
        //Changes here are welcome
        setIsLoading(true);
        const res = metric.calculateAndUpdateResult(xmlDoc);
        setIsLoading(false);
        setResult(res);
    }, [xmlDoc]);

    return (
        <div className={styles.metricElement}>
            <span className="metric-element-name">{metric.label}: &nbsp;</span>
            {isLoading ? (
                <Spinner />
            ) : (
                <span className="metric-element-result">
                    {result.toFixed(2)}
                </span>
            )}
        </div>
    );
};

export default MetricLabel;
