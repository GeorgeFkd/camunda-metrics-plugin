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
function ResultsTable({ data }) {
    console.log(typeof data, "hehe");
    let keysArr = [];
    if (data.keys()) {
        keysArr = Array.from(data.keys());
    } else {
        console.log("no keys");
    }

    return (
        <div className="place-above-status-bar full-width text-3xl bg-red-500">
            <table className="elements-table">
                <tr>
                    {keysArr.map((bpmnElementName) => {
                        return <th className="text-3xl">{bpmnElementName}</th>;
                    })}
                </tr>
                <tr>
                    {keysArr.map((bpmnElementKey) => {
                        return <td>{data.get(bpmnElementKey)}</td>;
                    })}
                </tr>
            </table>
        </div>
    );
}
