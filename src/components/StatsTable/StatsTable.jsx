import React from "react";
import { bpmnElementsDisplayed } from "../../assets/config";
import { MAP_BPMN_ELEMENTS_TO_ICON_CLASSES } from "../../assets/constants";
import StatsTableTitle from "./StatsTableTitle";
import StatsTableElement from "./StatsTableElement";
import "./StatsTable.css";
import CamundaContext from "../../contexts/CamundaContext";
import useSubscribe from "../../hooks/useSubscribe";
function StatsTable({ data }) {
    console.log("check the data ", data);
    const thecontext = React.useContext(CamundaContext);
    console.log("oh my goobie", thecontext);
    console.table(data);
    // useSubscribe("tab.saved", (dataFromEvent) => {
    //     console.log("dem hooks v2", dataFromEvent);
    // });
    return (
        <div className="stats-table-container">
            <StatsTableTitle title="Structural Elements Count" />
            <div className="stats-table-elements-container">
                {bpmnElementsDisplayed
                    .sort((a, b) => a.order - b.order)
                    .map((bpmnEl, idx) => {
                        //could make a conditional if there is icon and if there isnt

                        return (
                            <React.Fragment>
                                <StatsTableElement
                                    key={`stats-table-element-${idx}`}
                                    classForBpmnIcon={bpmnEl.iconClassname}
                                    occurencesOfElementInDiagram={data.get(
                                        bpmnEl.xmlTagName
                                    )}
                                />
                            </React.Fragment>
                        );
                    })}
            </div>
        </div>
    );
}

export default StatsTable;
