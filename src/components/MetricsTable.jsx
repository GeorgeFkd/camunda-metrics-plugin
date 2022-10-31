import React from "camunda-modeler-plugin-helpers/react";
import {
    numberOfEndEvents,
    numberOfEvents,
    numberOfGateways,
    numberOfStartEvents,
} from "../utils/metrics";
// import { XMLDataContext } from "../contexts/XMLDataContext.js";
// import * as BpmnMetrics from "../utils/metrics"

function MetricsTable({ data }) {
    // console.log(xmlData);
    //im getting only the state we should not update the xml from here

    console.log("Here are the results mr boss", data);
    const TNEE = numberOfEndEvents(data);
    const TNSE = numberOfStartEvents(data);
    const TNE = numberOfEvents(data);
    // const all_gateways = numberOfGateways(data);
    //map.size === 0 mas dinei an einai empty h oxi
    return (
        <div className="metrics-container">
            <div className="metrics-table-title">Bpmn Metrics</div>
            <div className="metrics-table">
                {/* mapping this */}
                <MetricLabel metricName="TNEE" metricResult={TNEE} />
                <MetricLabel metricName="TNSE" metricResult={TNSE} />
                <MetricLabel metricName="TNE" metricResult={TNE} />
                {/* <MetricLabel metricName="TNSE" metricResult={2} /> */}
            </div>
        </div>
    );
}
//i can slice it and render it in separate columns as a component
//or somehow wrap it with flex-column

function MetricLabel({ metricName, metricResult }) {
    return (
        <div className="metric-element">
            <span className="metric-element-name">{metricName}:</span>
            <span className="metric-element-result">{metricResult}</span>
        </div>
    );
}

export default MetricsTable;
