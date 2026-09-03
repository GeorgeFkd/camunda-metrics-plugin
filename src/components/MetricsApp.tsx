import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable/StatsTable";
import MetricsTable from "./MetricsTable/MetricsTable";
import styles from "./App.css";
export default function MetricsApp() {
    //XML file changes are tracked once, for the whole session, in MetricsPlugin
    //(see the app.activeTabChanged / tab.saved subscriptions there).
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
