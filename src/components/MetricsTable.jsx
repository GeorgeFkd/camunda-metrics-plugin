import React from "camunda-modeler-plugin-helpers/react";
import {
    numberOfEndEvents,
    numberOfEvents,
    numberOfStartEvents,
} from "../utils/metrics";

function MetricsTable({
    data,
    metrics,
    setMetrics,
    setRemovedMetrics,
    removeMetric,
}) {
    //TODO auto me tis cathgories pou mou eipane
    //epishs oi metrikes katatassontai kai se kathgories loipon

    return (
        <div className="metrics-container">
            <div className="metrics-table-title">BPMN Metrics</div>
            <div className="metrics-table">
                {/* mapping this with import * as BpmnMetrics(if it is an iterable) */}
                {metrics.map((elem) => {
                    console.log(elem);
                    return (
                        <MetricLabel
                            metric={elem}
                            removeMetric={removeMetric}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function MetricLabel({ metric, removeMetric }) {
    return (
        <div className="metric-element">
            <span className="metric-element-name">{metric.name}:</span>
            <span className="metric-element-result">{metric.metric}</span>
            <button onClick={() => removeMetric(metric)}>X</button>
        </div>
    );
}

export default MetricsTable;
