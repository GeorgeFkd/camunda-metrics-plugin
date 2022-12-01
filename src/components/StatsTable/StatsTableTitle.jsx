import React from "camunda-modeler-plugin-helpers/react";
import styles from "./StatsTable.css";
export default function StatsTableTitle({ title }) {
    return (
        <div className={styles.statsTableTitleContainer}>
            <span className={styles.statsTableTitle}>{title}</span>
        </div>
    );
}
