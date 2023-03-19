// import React from "camunda-modeler-plugin-helpers/react";
import React from "react";
import { Spinner } from "../Spinner";
import styles from "./StatsTable.css";

interface IStatsTableElementProps {
    classForBpmnIcon: string;
    occurencesOfElementInDiagram: number;
    onDragStart: React.DragEventHandler<HTMLElement>;
    onDragOver: React.DragEventHandler<HTMLElement>;
    onDrop: React.DragEventHandler<HTMLElement>;
}

export default function StatsTableElement({
    classForBpmnIcon,
    occurencesOfElementInDiagram,
    onDragStart,
    onDragOver,
    onDrop,
}: IStatsTableElementProps) {
    return (
        <div
            className={styles.elementComponent}
            draggable="true"
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <div className={styles.elementDisplay}>
                <span
                    className={classForBpmnIcon}
                    style={{ fontSize: "2rem" }}
                ></span>
                <span style={{ fontSize: "2rem" }}>&rarr;</span>
                <div className="container">
                    {/* This means the calculations haven't completed */}
                    {/* Otherwise it would be 0 */}
                    {occurencesOfElementInDiagram === -1 ? (
                        <div className={styles.spinnerContainer}>
                            <Spinner />
                        </div>
                    ) : (
                        <span className={styles.elementCount}>
                            {occurencesOfElementInDiagram}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
