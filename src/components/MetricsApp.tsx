import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable/StatsTable";
import MetricsTable from "./MetricsTable/MetricsTable";
import styles from "./App.css";
import useXmlFile from "../hooks/useXmlFile";
export default function MetricsApp() {
    useXmlFile();
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
