import React from "camunda-modeler-plugin-helpers/react";
import Metric from "../../../utils/metrics/Metric-Class";
import { Spinner } from "../../Spinner";
import styles from "./MetricLabel.css"

const MetricLabel = ({
    metric,
    xmlDoc,
}: {
    metric: Metric;
    xmlDoc: Document;
}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [result,setResult] = React.useState(metric.result)
    React.useEffect(() => {
        //here we calculate the metric,when it is loading display spinner
        console.time("Metric: " + metric.label);
        setIsLoading(true);
        metric.calculateAndUpdateResult(xmlDoc);
        setIsLoading(false);
        setResult(metric.result);
        console.timeEnd("Metric: " + metric.label)
    },[xmlDoc]);
    return (
        <div className={styles.metricElement}>
            <span className="metric-element-name">{metric.label}: &nbsp;</span>
            {isLoading ? (
                <Spinner />
            ) : (
                <span className="metric-element-result">
                    {metric.calculateAndUpdateResult(xmlDoc)}
                    {console.log(`${metric.result.toFixed(2)}`)}
                    {result.toFixed(2)}
                </span>
            )}
        </div>
    );
};

export default MetricLabel;