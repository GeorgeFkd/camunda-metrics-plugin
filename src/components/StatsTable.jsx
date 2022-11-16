import React from "react";
import { bpmnElementsToKeep } from "../assets/default-config.js";
import { MAP_BPMN_ELEMENTS_TO_ICON_CLASSES } from "../assets/constants";
import useCategories from "../hooks/useCategories.jsx";
import testRunner from "../utils/testMetrics";
function StatsTable({ data }) {
    console.log("check the data ", data);
    console.table(data);
    return (
        <div className="stats-table-container">
            <StatsTableTitle title="Structural Elements Count" />
            <div className="stats-table-elements-container">
                {bpmnElementsToKeep.map((bpmnEl, idx) => {
                    //could make a conditional if there is icon and if there isnt
                    let classForBpmnIcon;
                    if (
                        Object.keys(MAP_BPMN_ELEMENTS_TO_ICON_CLASSES).includes(
                            bpmnEl
                        )
                    ) {
                        classForBpmnIcon =
                            "bpmn-icon-" +
                            MAP_BPMN_ELEMENTS_TO_ICON_CLASSES[bpmnEl];
                    }

                    return (
                        <div
                            key={`removed-elems-${idx}`}
                            className="element-component"
                        >
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
                                    {data.get(bpmnEl) ? data.get(bpmnEl) : 0}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function StatsTableTitle({ title }) {
    return (
        <div className="stats-table-title-container">
            <span className="stats-table-title">{title}</span>
        </div>
    );
}

export default StatsTable;
