import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable.jsx";
import MetricsTable from "./MetricsTable.jsx";
import WidgetForRemovedElements from "./WidgetForRemovedELems.jsx";

export default function MetricsApp({ data, xmlData }) {
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
    console.info("Inside Metrics App: ", data);
    const [metrics, setMetrics] = React.useState([
        { name: "TNE", result: 12 },
        { name: "TNSE", result: 13 },
    ]);

    // semantically einai pio poly hidden para removed
    const [removedMetrics, setRemovedMetrics] = React.useState([
        { name: "TNEE", result: 5 },
    ]);
    function removeMetric(metricToRemove) {
        setRemovedMetrics((prev) => [...prev, metricToRemove]);
        setMetrics(metrics.filter((el) => el.name !== metricToRemove.name));
    }

    function calculateAllMetrics() {}

    React.useEffect(() => {
        console.log("calculating metrics data");
    }, []);
    return (
        <div className="app-container">
            {data ? (
                <React.Fragment>
                    <StatsTable
                        data={data}
                        elementsToKeep={bpmnElementsToKeep}
                    />

                    <MetricsTable
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
