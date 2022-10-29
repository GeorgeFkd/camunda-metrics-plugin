import * as React from "camunda-modeler-plugin-helpers/react";

import * as ReactDOM from "react-dom";
import "../style.css";
import { Fill, Slot } from "camunda-modeler-plugin-helpers/components";

import { analyzeXMLString } from "../utils/analyzeXMLString";
import saveAnalysisToCsv from "../utils/saveAnalysisToCsv";
import "../style.css";
export default function MetricsPlugin(props) {
    //me to subscribe mporw na parw prosvash se events tou eventBus
    const { config, subscribe, triggerAction } = props;
    const [analysis, setAnalysis] = React.useState(new Map());
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        console.log(props.config.backend.getPlatform());
        console.log(triggerAction);
        subscribe("tab.closed", (arg) => {
            //i got the xml file here
            console.log(typeof arg.tab.file.contents);
            //setAnalysis(analyzeXMLString(arg.tab.file.contents));
        });

        //pairnw thn bara katw katw,vazw ena element prin apo authn
        //kai ekei mesa kanw meta render ton pinaka me auta pou thelw
        const statusBar = document.getElementsByTagName("footer")[0];
        const rootDiv = document.createElement("div");
        rootDiv.id = "table-root";
        rootDiv.className = "toggle-hide-show";
        statusBar.parentNode.insertBefore(rootDiv, statusBar);
    }, []);

    function toggleTable() {
        //this is a mess and must be fixed somehow
        const container = document.getElementById("table-root");
        //auto anoigokleinei to ui
        container.classList.toggle("toggle-hide-show");
        //ousiastika otan einai kleisto kai pataw gia na to anoiksw kanw save,
        //gia na parw access sto tab pou exei kai to xml file
        if (!open) {
            triggerAction("save").then((tab) => {
                console.log(tab, "im here bro");
                setAnalysis(analyzeXMLString(tab.file.contents));
                console.info("Kowalski im done");
            });
        }
        setOpen((open) => !open);
    }
    // shows a click me button at the bottom part of the app
    return (
        <React.Fragment>
            {console.log("Kowalski", analysis)}
            <Fill slot="status-bar__app" group="1_autosave">
                <button onClick={toggleTable}>Click Me</button>
            </Fill>
            {open
                ? ReactDOM.render(
                      <ResultsTable data={analysis} />,
                      document.getElementById("table-root")
                  )
                : null}
        </React.Fragment>
    );
}

//XREIAZOMAI OLA TA PITHANA ELEMENTS(APO BPMN.IO TA PAIRNW) KAI META VAZW TON XRHSTH NA KANEI TRACK AUTA POY THELEI

//THE FUCKING BPMN.IO IS WHERE THE ANSWERS ARE FOUND
//DONE THELW KAPWS ME TO KOUMPI NA KANW KAI SAVE GIA NA KANEI TRIGGER TO tab.saved
//TODO STYLING

//layout idea: olo aristera na einai ta megethi sthn mesh h typoi kai sthn akrh oti widgets xreiazontai
function ResultsTable({ data }) {
    //data will come in as a map mb later as object
    const bpmnElementsToKeep = [
        "subProcess",
        "startEvent",
        "intermediateThrowEvent",
        "callActivity",
    ];
    const [elementsToKeep, setElementsToKeep] =
        React.useState(bpmnElementsToKeep);
    const [elementsRemoved, setElementsRemoved] = React.useState([]);
    console.log("data i work with", data);

    function removeElement(elemNameToRemove) {
        setElementsRemoved((prev) => [...prev, elemNameToRemove]);
        setElementsToKeep(
            elementsToKeep.filter((el) => el !== elemNameToRemove)
        );
    }

    return (
        <div className="app-container">
            <div className="elements-table-container">
                {elementsToKeep.map((bpmnEl, idx) => {
                    return (
                        <div
                            key={`removed-elems-${idx}`}
                            className="element-component"
                        >
                            {/* edw sto mellon tha mporouse na mpei icon */}
                            <span className="element-name">{bpmnEl}</span>
                            <span className="element-count">
                                {data.get(bpmnEl)}
                            </span>
                            <button
                                className="remove-element"
                                onClick={() => removeElement(bpmnEl)}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="tools-container">
                <WidgetForRemovedElements
                    removedElements={elementsRemoved}
                    setDisplayedElems={setElementsToKeep}
                    setRemovedElems={setElementsRemoved}
                />
            </div>
        </div>
    );
}

function WidgetForRemovedElements({
    removedElements,
    setDisplayedElems,
    setRemovedElems,
}) {
    //gets the removed Elements
    //clicking the widget should display a tiny board
    // with checkboxes of the elements removed and an ok element to bring them back
    //this also needs an icon
    //otan pataw ok na to kleinei gia na mhn exw themata kai pio aneto
    const [open, setOpen] = React.useState(true);
    const [checkedElems, setCheckedElems] = React.useState([]);

    function toggleCheckBox(elNameToAddRemoveInCheckedList, event) {
        const isChecked = event.target.checked;
        console.log(isChecked);
        if (isChecked) {
            //add it to the checkedElemsList
            setCheckedElems((prev) => [
                ...prev,
                elNameToAddRemoveInCheckedList,
            ]);
        } else {
            //remove it from the checkedElemsList
            setCheckedElems((prev) =>
                prev.filter((curr) => curr !== elNameToAddRemoveInCheckedList)
            );
        }
    }

    function addBackRemovedCheckedElements() {
        // setElems
        setDisplayedElems((prev) => [...prev, ...checkedElems]);
        setRemovedElems((prev) =>
            prev.filter((curr) => !checkedElems.includes(curr))
        );
        setCheckedElems([]);
        setOpen((prev) => false);
        console.log("currently", open);
        // uncheck e
    }

    return (
        <div className="addremoved-widget-container">
            <button
                className="addremoved-widget"
                onClick={() => {
                    console.log("clicked button");
                    setOpen((prev) => {
                        console.log(prev);
                        return !prev;
                    });
                }}
            >
                Removed Elements
            </button>
            <div
                className={`addremoved-menu ${
                    !open ? "toggle-hide-show" : ""
                } `}
            >
                {/* this might become its own component sometime */}
                {removedElements.map((elName) => {
                    return (
                        <div className="element-component">
                            <span className="element-name">{elName}</span>
                            <input
                                type="checkbox"
                                className="element-checkbox"
                                onChange={(evt) => toggleCheckBox(elName, evt)}
                            />
                        </div>
                    );
                })}
                <button
                    className="btn-primary addremoved-okbutton"
                    onClick={() => addBackRemovedCheckedElements()}
                >
                    OK
                </button>
            </div>
        </div>
    );
}
