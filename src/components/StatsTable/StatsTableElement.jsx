import React from "camunda-modeler-plugin-helpers/react";
import styles from "./StatsTable.css";
export default function StatsTableElement({
    classForBpmnIcon,
    occurencesOfElementInDiagram,
}) {
    return (
        <div className={styles.elementComponent}>
            <div className={styles.elementDisplay}>
                <span
                    className={classForBpmnIcon}
                    style={{ fontSize: "2rem" }}
                ></span>
                <span style={{ fontSize: "2rem" }}>&rarr;</span>
                <span className={styles.elementCount}>
                    {/* an kati den yparxei kan na to vgazei 0 */}
                    {occurencesOfElementInDiagram
                        ? occurencesOfElementInDiagram
                        : 0}
                </span>
            </div>
        </div>
    );
}
