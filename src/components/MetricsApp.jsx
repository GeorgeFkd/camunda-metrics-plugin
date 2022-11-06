import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable.jsx";
import MetricsTable from "./MetricsTable.jsx";
import WidgetForRemovedElements from "./WidgetForRemovedELems.jsx";
import { CategoriesHookContext } from "../contexts/CategoriesContext.jsx";
import useCategories from "../hooks/useCategories.jsx";
export default function MetricsApp({ data, xmlData }) {
    //will probably need all of those

    const globalCategoriesHook = useCategories();
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

    //!watch out triggering rerenders when xml is saved must recalculate the metrics
    function calculateAllMetrics() {}

    React.useEffect(() => {
        console.log("calculating metrics data");
    }, []);
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
