import React from "camunda-modeler-plugin-helpers/react";
import styles from "./StatsTable.css";
import useStore from "../../store/store";

interface IStatsTableTitleProps{
    title:string
}

export default function StatsTableTitle({ title }:IStatsTableTitleProps) {
        const currentParticipant = useStore((state)=>state.currentSelectedParticipant)
        let msgDisplayed:string;
    if(currentParticipant.name === ""){
        msgDisplayed = "No Selected Participant"
    }else{
        msgDisplayed = `Participant: ${currentParticipant.name}`
    }
    return (
        <div className={styles.statsTableTitleContainer}>
            <span className={styles.statsTableTitle}>{title}</span> 
            <span className={styles.currentParticipant}>{msgDisplayed}</span>
        </div>
    );
}
