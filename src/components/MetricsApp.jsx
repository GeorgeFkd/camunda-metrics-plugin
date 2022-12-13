import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable/StatsTable";
import MetricsTable from "./MetricsTable/MetricsTable";
import styles from "./App.css";
export default function MetricsApp() {
    const ToRender = (
        <div className={styles.appContainer}>
            <React.Fragment>
                <StatsTable />

                <MetricsTable />
            </React.Fragment>
        </div>
    );

    return ToRender;
}
