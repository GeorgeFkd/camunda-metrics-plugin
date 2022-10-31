import React from "camunda-modeler-plugin-helpers/react";

import { render } from "react-dom";
import "../style.css";
import { Fill } from "camunda-modeler-plugin-helpers/components";
// import { DataProvider } from "../contexts/XMLDataContext.jsx";
import { analyzeXMLString } from "../utils/analyzeXMLString";
import { XMLDataContext } from "../contexts/XMLDataContext.js";
import "../style.css";
//needs the .jsx for some reason

import MetricsApp from "./MetricsApp.jsx";

const CLICKED_BTN_WITH_WINDOW_CLOSED = "NOT_OPEN_WINDOW";
const CLICKED_BTN_WITH_WINDOW_OPEN = "OPEN_WINDOW";
const DATA_FETCHED = "FETCHED_DATA";
export default function MetricsPlugin(props) {
    //me to subscribe mporw na parw prosvash se events tou eventBus
    const { config, subscribe, triggerAction } = props;
    const [state, dispatch] = React.useReducer(reducer, {
        open: false,
        analysisData: new Map(),
        xmlData: "",
    });

    function reducer(state, action) {
        //ama den einai anoixto to parathiro(dld twra anoigei)
        //to anoigoume(open->true) kai vazoume ta dedomena sto state
        //ama einai anoixto einai provlhma na to kanoume diarkws update?
        console.log(action.type);
        switch (action.type) {
            case CLICKED_BTN_WITH_WINDOW_CLOSED: {
                return { ...state, open: true };
            }
            case CLICKED_BTN_WITH_WINDOW_OPEN: {
                console.info("hiding app");
                return {
                    ...state,
                    open: false,
                };
            }
            case DATA_FETCHED: {
                return {
                    ...state,
                    analysisData: action.payload,
                };
            }
        }
        throw Error("Unknown action " + action.type);
    }

    console.log("we going in");
    React.useEffect(() => {
        // console.log(props.config.backend.getPlatform());
        // console.log(triggerAction);
        // subscribe("app.activeTabChanged", (arg) => {
        // gotta change the underlying xml here
        const statusBar = document.getElementsByTagName("footer")[0];
        const rootDiv = document.createElement("div");
        rootDiv.id = "table-root";
        rootDiv.className = "toggle-hide-show";
        statusBar.parentNode.insertBefore(rootDiv, statusBar);
        subscribe("bpmn.modeler.created", (arg) => {
            //THIS WORKS
            console.log("arg");
            const xml = arg.tab.file.contents;
            const analysis = analyzeXMLString(xml);
            dispatch({ type: DATA_FETCHED, payload: analysis });
        });
        subscribe("app.activeTabChanged", ({ activeTab }) => {
            //this also works genika ligo prosoxh me ta listeners
            const xml = activeTab.file.contents;
            const analysis = analyzeXMLString(xml);
            dispatch({ type: DATA_FETCHED, payload: analysis });
        });

        //pairnw thn bara katw katw,vazw ena element prin apo authn
        //kai ekei mesa kanw meta render ton pinaka me auta pou thelw
    }, []);

    function toggleTable(button) {
        //this is a mess and must be fixed somehow
        const container = document.getElementById("table-root");
        //auto anoigokleinei to ui
        container.classList.toggle("toggle-hide-show");
        button.classList.toggle("show-metricsPlugin-button-active");
        //ousiastika otan einai kleisto kai pataw gia na to anoiksw kanw save,
        //gia na parw access sto tab pou exei kai to xml file

        if (!state.open) {
            dispatch({ type: CLICKED_BTN_WITH_WINDOW_CLOSED });
            // dispatch({type:})
        } else {
            dispatch({ type: CLICKED_BTN_WITH_WINDOW_OPEN });
        }
    }

    // shows a click me button at the bottom part of the app
    return (
        // <XMLDataContext.Provider value={{ analyze: state.analysisData }}>
        <React.Fragment>
            {/* yparxei kai to slot toolbar */}
            <Fill slot="status-bar__app" group="1_autosave" priority={100}>
                <button
                    className="show-metricsPlugin-button"
                    onClick={({ target }) => toggleTable(target)}
                >
                    Metrics
                </button>
            </Fill>
            {state.open
                ? render(
                      <MetricsApp data={state.analysisData} />,
                      document.getElementById("table-root")
                  )
                : null}
        </React.Fragment>
        // </XMLDataContext.Provider>
    );
}

//XREIAZOMAI OLA TA PITHANA ELEMENTS(APO BPMN.IO TA PAIRNW)
//KAI META VAZW TON XRHSTH NA KANEI TRACK AUTA POY THELEI[vrhka ta events btw]

//THE FUCKING BPMN.IO IS WHERE THE ANSWERS ARE FOUND

//layout idea: olo aristera na einai ta megethi sthn mesh h typoi kai sthn akrh oti widgets xreiazontai
