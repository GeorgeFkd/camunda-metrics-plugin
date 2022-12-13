import React from "camunda-modeler-plugin-helpers/react";
import { bpmnElementsDisplayed as bpmnElemsWithInitialOrder } from "../../assets/config";
import { MAP_BPMN_ELEMENTS_TO_ICON_CLASSES } from "../../assets/constants";
import StatsTableTitle from "./StatsTableTitle";
import StatsTableElement from "./StatsTableElement";
import styles from "./StatsTable.css";
import CamundaContext from "../../contexts/CamundaContext";
import useSubscribe from "../../hooks/useSubscribe";
import { countStructuralElements } from "../../utils/metrics/utils";
import { DOMParser } from "xmldom";
function StatsTable() {
    const [xmlStructuralElems, setXmlStructuralElems] = React.useState(null);
    const parserRef = React.useRef(new DOMParser());
    const { triggerCamundaAction } = React.useCallback(
        React.useContext(CamundaContext),
        []
    );
    const [bpmnElementsToDisplay, setBpmnElementsToDisplay] = React.useState(
        bpmnElemsWithInitialOrder
    );

    React.useEffect(() => {
        //this is needed to
        //trigger a rerender on the first mount so that i have subscribed to the events
        console.log(triggerCamundaAction, "trig");
        triggerCamundaAction("save").then((tab) => {
            if (!tab) {
                console.error("failed to save");
            }
            console.log("tab");
        });
    }, []);

    useSubscribe("tab.saved", (dataFromEvent) => {
        console.log("dem hooks v2", dataFromEvent.tab);
        console.log("tab was saved in Stats table");
        if (dataFromEvent.tab.type === "empty") {
            console.log("tab is empty do nothing");
        } else {
            const parsedDocument = parserRef.current.parseFromString(
                dataFromEvent.tab.file.contents
            );
            console.log(parsedDocument);
            const finalData = countStructuralElements(parsedDocument);
            setXmlStructuralElems(finalData);
        }
    });
    useSubscribe("app.activeTabChanged", (dataFromEvent) => {
        //console.log("dem hooks v2", dataFromEvent.activeTab.file.contents);
        console.log("active Tab Changed in Stats Table");
        if (dataFromEvent.activeTab.type === "empty") {
            console.log("tab is empty do nothing");
        } else {
            const parsedDocument = parserRef.current.parseFromString(
                dataFromEvent.activeTab.file.contents
            );
            console.log(parsedDocument);
            const finalData = countStructuralElements(parsedDocument);
            setXmlStructuralElems(finalData);
        }
    });

    const onDragOverElement = (e) => {
        //do sth
        e.preventDefault();
    };
    const onDragStartElement = React.useCallback((e, order) => {
        //do sth
        console.log("drag start", order);
        e.dataTransfer.setData("order", order);
    }, []);
    const onDropElement = React.useCallback(
        (e, oldOrder) => {
            //do sth
            const newOrder = parseInt(e.dataTransfer.getData("order"));
            console.log("to drop:", newOrder);
            console.log("to switch with", oldOrder);
            console.log("pre switch", xmlStructuralElems);
            if (!bpmnElementsToDisplay) return;
            const newElems = bpmnElementsToDisplay.map((elem) => {
                if (elem.order === newOrder)
                    return { ...elem, order: oldOrder };
                if (elem.order === oldOrder)
                    return { ...elem, order: newOrder };
                return elem;
            });
            console.log("new state", newElems);
            //console.log(newOrd)
            setBpmnElementsToDisplay(newElems);
        },
        [bpmnElementsToDisplay]
    );
    //! probably the onDragStart and onDragOver should be here
    return (
        <div className={styles.statsTableContainer}>
            <StatsTableTitle title="Structural Elements Count" />
            <div className={styles.statsTableElementsContainer}>
                {bpmnElementsToDisplay
                    .sort((a, b) => a.order - b.order)
                    .map((bpmnEl, idx) => {
                        //could make a conditional if there is icon and if there isnt
                        //0 when not defined, -1 when still loading
                        let result = 0;
                        if (xmlStructuralElems) {
                            if (
                                xmlStructuralElems.get(bpmnEl.xmlTagName) !==
                                undefined
                            ) {
                                result = xmlStructuralElems.get(
                                    bpmnEl.xmlTagName
                                );
                            } else {
                                result = 0;
                            }
                        } else {
                            result = -1;
                        }
                        return (
                            <React.Fragment>
                                <StatsTableElement
                                    onDragOver={(e) => onDragOverElement(e)}
                                    onDragStart={(e) =>
                                        onDragStartElement(e, bpmnEl.order)
                                    }
                                    onDrop={(e) =>
                                        onDropElement(e, bpmnEl.order)
                                    }
                                    key={`stats-table-element-${idx}`}
                                    classForBpmnIcon={bpmnEl.iconClassname}
                                    occurencesOfElementInDiagram={result}
                                />
                            </React.Fragment>
                        );
                    })}
            </div>
        </div>
    );
}

export default StatsTable;
