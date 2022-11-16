import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable.jsx";
import MetricsTable from "./MetricsTable.jsx";
import WidgetForRemovedElements from "./WidgetForRemovedELems.jsx";
import { CategoriesHookContext } from "../contexts/CategoriesContext.jsx";
import useCategories from "../hooks/useCategories.jsx";
import { bpmnElementsToKeep } from "../assets/default-config.js";
export default function MetricsApp({ data, xmlData, calculatedMetrics }) {
    const globalCategoriesHook = useCategories(calculatedMetrics);
    // console.info("Inside Metrics App: ", data);

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
                <div>Loading...</div>
            )}
        </div>
    );
}
