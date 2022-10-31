import React from "camunda-modeler-plugin-helpers/react";
import { XMLDataContext } from "../contexts/XMLDataContext.js";
import StatsTable from "./StatsTable.jsx";
import MetricsTable from "./MetricsTable.jsx";
import { numberOfActivitiesMetric, numberOfEvents } from "../utils/metrics";
import WidgetForRemovedElements from "./WidgetForRemovedELems.jsx";
export default function MetricsApp({ data }) {
    //data will come in as a map mb later as object
    const bpmnElementsToKeep = [
        "task",
        "subProcess",
        "startEvent",
        "intermediateThrowEvent",
        "callActivity",
    ];
    // i should only get the update function no state in high level

    const bpmnElemsCountData = data;
    // const bpmnElemsCountData = new Map();
    console.log("for context", bpmnElemsCountData);
    // React.useEffect(()=>{
    //     // doesnt see this as a function
    //     updateXmlData("BZZZZZ")
    // })
    console.log("pspspsppspspsp");
    const [elementsToKeep, setElementsToKeep] =
        React.useState(bpmnElementsToKeep);
    const [elementsRemoved, setElementsRemoved] = React.useState([]);
    // console.log("data i work with", bpmnElemsCountData);
    // numberOfActivitiesMetric(bpmnElemsCountData);
    // numberOfEvents(bpmnElemsCountData);

    function removeElement(elemNameToRemove) {
        setElementsRemoved((prev) => [...prev, elemNameToRemove]);
        setElementsToKeep(
            elementsToKeep.filter((el) => el !== elemNameToRemove)
        );
    }

    return (
        <div className="app-container">
            {data ? (
                <React.Fragment>
                    <StatsTable
                        data={bpmnElemsCountData}
                        removeElement={removeElement}
                        elementsToKeep={elementsToKeep}
                    />

                    <MetricsTable data={data} />

                    <div className="tools-container">
                        <WidgetForRemovedElements
                            removedElements={elementsRemoved}
                            setDisplayedElems={setElementsToKeep}
                            setRemovedElems={setElementsRemoved}
                        />
                    </div>
                </React.Fragment>
            ) : (
                <div>Sry please wait</div>
            )}
        </div>
    );
}
