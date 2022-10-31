import React from "camunda-modeler-plugin-helpers/react";
import {
    numberOfEndEvents,
    numberOfEvents,
    numberOfStartEvents,
} from "../utils/metrics";

function MetricsTable({ data }) {
    const TNEE = numberOfEndEvents(data);
    const TNSE = numberOfStartEvents(data);
    const TNE = numberOfEvents(data);
    // const all_gateways = numberOfGateways(data);
    //map.size === 0 mas dinei an einai empty h oxi
    return (
        <div className="metrics-container">
            <div className="metrics-table-title">Bpmn Metrics</div>
            <div className="metrics-table">
                {/* mapping this with import * as BpmnMetrics(if it is an iterable) */}
                <MetricLabel metricName="TNEE" metricResult={TNEE} />
                <MetricLabel metricName="TNSE" metricResult={TNSE} />
                <MetricLabel metricName="TNE" metricResult={TNE} />
            </div>
        </div>
    );
}

function MetricLabel({ metricName, metricResult }) {
    return (
        <div className="metric-element">
            <span className="metric-element-name">{metricName}:</span>
            <span className="metric-element-result">{metricResult}</span>
        </div>
    );
}

export default MetricsTable;
