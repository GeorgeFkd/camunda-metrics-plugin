import React from "camunda-modeler-plugin-helpers/react";
import styles from "./StatsTable.css";

interface IStatsTableTitleProps{
    title:string
}

export default function StatsTableTitle({ title }:IStatsTableTitleProps) {
    return (
        <div className={styles.statsTableTitleContainer}>
            <span className={styles.statsTableTitle}>{title}</span>
        </div>
    );
}
