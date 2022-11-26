import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable/StatsTable";
import MetricsTable from "./MetricsTable/MetricsTable";
import WidgetForRemovedElements from "./Widgets/WidgetForRemovedELems";
import { CategoriesHookContext } from "../contexts/CategoriesContext";
import useCategories from "../hooks/useCategories";
import { bpmnElementsToKeep } from "../assets/default-config";
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
                        <StatsTable data={data} />

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
