import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable/StatsTable";
import MetricsTable from "./MetricsTable/MetricsTable";
import WidgetForRemovedElements from "../deprecated/WidgetForRemovedELems";
import { CategoriesHookContext } from "../contexts/CategoriesContext";
import useCategories from "../hooks/useCategories";
import { bpmnElementsToKeep } from "../assets/default-config";
import styles from "./App.css";
export default function MetricsApp({ xmlFile }) {
    //const globalCategoriesHook = useCategories(calculatedMetrics);

    // console.info("Inside Metrics App: ", data);

    const ToRender = (
        <div className={styles.appContainer}>
            <React.Fragment>
                {/* <CategoriesHookContext.Provider
                        value={globalCategoriesHook}
                    > */}
                <StatsTable />

                <MetricsTable />
                {/* </CategoriesHookContext.Provider> */}
            </React.Fragment>
        </div>
    );

    return ToRender;
}
