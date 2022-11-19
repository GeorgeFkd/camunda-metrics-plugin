import React from "camunda-modeler-plugin-helpers/react";

export default function StatsTableElement({
    classForBpmnIcon,
    occurencesOfElementInDiagram,
}) {
    return (
        <div className="element-component">
            {/* edw sto mellon tha mporouse na mpei icon */}
            <div className="element-display">
                {/* <span
                                className={`element-name ${classForBpmnIcon}`}
                            >
                                {bpmnEl}:
                            </span> */}
                <span
                    className={classForBpmnIcon}
                    style={{ fontSize: "2rem" }}
                ></span>
                <span style={{ fontSize: "2rem" }}>&rarr;</span>
                <span className="element-count">
                    {/* an kati den yparxei kan na to vgazei 0 */}
                    {occurencesOfElementInDiagram
                        ? occurencesOfElementInDiagram
                        : 0}
                </span>
            </div>
        </div>
    );
}
