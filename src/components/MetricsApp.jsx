import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable.jsx";
import MetricsTable from "./MetricsTable.jsx";
import WidgetForRemovedElements from "./WidgetForRemovedELems.jsx";
import {
    numberOfEndEvents,
    numberOfEvents,
    numberOfStartEvents,
} from "../utils/metrics";
export default function MetricsApp({ data }) {
    //will probably need all of those
    const bpmnElementsToKeep = [
        "task",
        "startEvent",
        "endEvent",
        "exclusiveGateway",
        "complexGateway",
        "inclusiveGateway",
        "incoming",
        "outgoing",
    ];
    // i should only get the update function no state in high level
    const bpmnElemsCountData = data;
    console.info("Inside Metrics App: ", bpmnElemsCountData);
    const TNEE = numberOfEndEvents(data);
    const TNSE = numberOfStartEvents(data);
    const TNE = numberOfEvents(data);
    const [metrics, setMetrics] = React.useState([
        { name: "TNE", result: TNE },
        { name: "TNSE", result: TNSE },
    ]);

    // semantically einai pio poly hidden para removed
    const [removedMetrics, setRemovedMetrics] = React.useState([
        { name: "TNEE", result: TNEE },
    ]);
    function removeMetric(metricToRemove) {
        console.log(metricToRemove, removedMetrics, metrics, "vzoom");
        setRemovedMetrics((prev) => [...prev, metricToRemove]);
        setMetrics(metrics.filter((el) => el.name !== metricToRemove.name));
    }

    return (
        <div className="app-container">
            {data ? (
                <React.Fragment>
                    <StatsTable
                        data={bpmnElemsCountData}
                        elementsToKeep={bpmnElementsToKeep}
                    />

                    <MetricsTable
                        data={data}
                        metrics={metrics}
                        setMetrics={setMetrics}
                        removeMetric={removeMetric}
                        setRemovedMetrics={setRemovedMetrics}
                    />

                    <div className="tools-container">
                        <WidgetForRemovedElements
                            removedElements={removedMetrics}
                            setDisplayedElems={setMetrics}
                            setRemovedElems={setRemovedMetrics}
                        />
                    </div>
                </React.Fragment>
            ) : (
                <div>Sry please wait</div>
            )}
        </div>
    );
}
