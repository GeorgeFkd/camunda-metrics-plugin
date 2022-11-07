import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable.jsx";
import MetricsTable from "./MetricsTable.jsx";
import WidgetForRemovedElements from "./WidgetForRemovedELems.jsx";
import { CategoriesHookContext } from "../contexts/CategoriesContext.jsx";
import useCategories from "../hooks/useCategories.jsx";
export default function MetricsApp({ data, xmlData, calculatedMetrics }) {
    const globalCategoriesHook = useCategories(calculatedMetrics);
    const bpmnElementsToKeep = [
        "task",
        "startEvent",
        "endEvent",
        "exclusiveGateway",
        "complexGateway",
        "inclusiveGateway",
        "incoming",
        "outgoing",
        "parallelGateway",
    ];
    // console.info("Inside Metrics App: ", data);

    function calculateAllMetrics() {}

    React.useEffect(() => {
        console.log("CALCULATED THE METRICS GRAB EM", calculatedMetrics);
    }, [calculatedMetrics]);
    return (
        <div className="app-container">
            {data ? (
                <React.Fragment>
                    <CategoriesHookContext.Provider
                        value={globalCategoriesHook}
                    >
                        <StatsTable
                            data={data}
                            elementsToKeep={bpmnElementsToKeep}
                        />

                        <MetricsTable />

                        <div className="tools-container">
                            <WidgetForRemovedElements />
                        </div>
                    </CategoriesHookContext.Provider>
                </React.Fragment>
            ) : (
                <div>Sry please wait</div>
            )}
        </div>
    );
}
