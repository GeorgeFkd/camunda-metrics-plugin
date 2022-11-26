import React from "react";
import { bpmnElementsToKeep } from "../../assets/default-config";
import { MAP_BPMN_ELEMENTS_TO_ICON_CLASSES } from "../../assets/constants";
import StatsTableTitle from "./StatsTableTitle";
import StatsTableElement from "./StatsTableElement";
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
                    let ToRender;
                    if ((idx + 1) % 3 == 0) {
                        ToRender = (
                            <React.Fragment>
                                <StatsTableElement
                                    key={`stats-table-element-${idx}`}
                                    classForBpmnIcon={classForBpmnIcon}
                                    occurencesOfElementInDiagram={data.get(
                                        bpmnEl
                                    )}
                                />
                                <span style={{ width: "100%" }}></span>
                            </React.Fragment>
                        );
                    } else {
                        ToRender = (
                            <StatsTableElement
                                key={`stats-table-element-${idx}`}
                                classForBpmnIcon={classForBpmnIcon}
                                occurencesOfElementInDiagram={data.get(bpmnEl)}
                            />
                        );
                    }

                    return ToRender;
                })}
            </div>
        </div>
    );
}

export default StatsTable;
