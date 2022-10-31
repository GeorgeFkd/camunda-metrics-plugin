import React from "camunda-modeler-plugin-helpers/react";
import StatsTable from "./StatsTable.jsx";
import MetricsTable from "./MetricsTable.jsx";
import WidgetForRemovedElements from "./WidgetForRemovedELems.jsx";
export default function MetricsApp({ data }) {
    const bpmnElementsToKeep = [
        "task",
        "subProcess",
        "startEvent",
        "exclusiveGateway",
        "intermediateEvent",
    ];
    // i should only get the update function no state in high level
    const bpmnElemsCountData = data;
    console.info("Inside Metrics App: ", bpmnElemsCountData);
    const [elementsToKeep, setElementsToKeep] =
        React.useState(bpmnElementsToKeep);
    const [elementsRemoved, setElementsRemoved] = React.useState([]);

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
