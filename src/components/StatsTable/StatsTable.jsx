import React from "react";
import { bpmnElementsToKeep } from "../../assets/default-config.js";
import { MAP_BPMN_ELEMENTS_TO_ICON_CLASSES } from "../../assets/constants";
import StatsTableTitle from "./StatsTableTitle.jsx";
import StatsTableElement from "./StatsTableElement.jsx";
function StatsTable({ data }) {
    console.log("check the data ", data);
    console.table(data);
    return (
        <div className="stats-table-container">
            <StatsTableTitle title="Structural Elements Count" />
            <div className="stats-table-elements-container">
                {bpmnElementsToKeep.map((bpmnEl, idx) => {
                    //could make a conditional if there is icon and if there isnt
                    let classForBpmnIcon = "";
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
                        <StatsTableElement
                            key={`stats-table-element-${idx}`}
                            classForBpmnIcon={classForBpmnIcon}
                            occurencesOfElementInDiagram={data.get(bpmnEl)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default StatsTable;
