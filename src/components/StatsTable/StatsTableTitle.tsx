import React from "camunda-modeler-plugin-helpers/react";
import styles from "./StatsTable.css";
import useStore from "../../store/store";
import { STATS_TABLE_TEXT } from "../../assets/text_content";


export default function StatsTableTitle() {
    const currentParticipant = useStore(
        (state) => state.currentSelectedParticipant
    );
    let msgDisplayed: string;
    let styleForNoParticipant: string = "";
    if (currentParticipant.name === "") {
        msgDisplayed = STATS_TABLE_TEXT.WHOLE_MODEL;
        styleForNoParticipant = styles.noParticipant;
    } else {
        msgDisplayed = STATS_TABLE_TEXT.WITH_PARTICIPANT + currentParticipant.name;
    }
    return (
        <div className={styles.statsTableTitleContainer}>
            <span className={`${styles.statsTableTitle}`}>{STATS_TABLE_TEXT.TITLE}</span>
            <span className={`${styles.currentParticipant} ${styleForNoParticipant}`}>{msgDisplayed}</span>
        </div>
    );
}
