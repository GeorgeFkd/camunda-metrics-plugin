import React from "camunda-modeler-plugin-helpers/react";

import { render } from "react-dom";
import "../style.scss";
import { Fill } from "camunda-modeler-plugin-helpers/components";
import calculateAllMetrics, {
    analyzeXMLString,
} from "../utils/analyzeXMLString";
import CalculateAllMetricsOptimized from "../utils/CalculateAllMetricsCombined";
//needs the .jsx for some reason
import MetricsApp from "./MetricsApp.jsx";

const CLICKED_BTN_WITH_WINDOW_CLOSED = "NOT_OPEN_WINDOW";
const CLICKED_BTN_WITH_WINDOW_OPEN = "OPEN_WINDOW";
const DATA_FETCHED = "FETCHED_DATA";
export default function MetricsPlugin(props) {
    const { config, subscribe } = props;
    const [state, dispatch] = React.useReducer(reducer, {
        open: false,
        analysisData: new Map(),
        xmlData: "",
    });

    React.useEffect(() => {
        console.log("CURRENTLY CALCULATED METRICS", state.metrics);
    }, [state.metrics]);

    function reducer(state, action) {
        //state.open apo to button clicked anoigokleinei to app
        //data fetched einai sta events pou prokaloun allagh sta dedomena
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
                //8-10 times faster with the new way
                //probably the repeated parsing is the problem,
                //the separate methods will not be deleted
                // console.time("XML analysis unoptimized");
                // const calculatedMetrics = calculateAllMetrics(action.payload);
                // console.timeEnd("XML analysis unoptimized");

                console.time("XML analysis optimized");
                const calculatedMetricsCombined = CalculateAllMetricsOptimized(
                    action.payload
                );
                console.timeEnd("XML analysis optimized");
                return {
                    ...state,
                    analysisData: analyzeXMLString(action.payload),
                    xmlData: action.payload,
                    metrics: calculatedMetricsCombined,
                };
            }
        }
        throw Error("Unknown action " + action.type);
    }

    React.useEffect(() => {
        //pairnw thn bara katw katw,vazw ena element prin apo authn
        //kai ekei mesa kanw meta render ton pinaka me auta pou thelw(cant do sth cleaner yet)
        const statusBar = document.getElementsByTagName("footer")[0];
        const rootDiv = document.createElement("div");
        rootDiv.id = "table-root";
        rootDiv.className = "toggle-hide-show";
        statusBar.parentNode.insertBefore(rootDiv, statusBar);
        function fetchData(xml) {
            dispatch({ type: DATA_FETCHED, payload: xml });
        }

        subscribe("bpmn.modeler.created", (arg) => {
            console.info("event modeler created", arg);
            if (arg.tab.type === "empty") {
                console.log("no diagram yet");
            } else {
                fetchData(arg.tab.file.contents);
            }
        });
        subscribe("app.activeTabChanged", ({ activeTab }) => {
            //this event is also fired when the app closes
            console.info("event active tab changed", activeTab);
            if (activeTab.type === "empty") {
                console.log("byeeee");
            } else {
                fetchData(activeTab.file.contents);
            }
        });
        subscribe("tab.saved", ({ tab }) => {
            console.info("event tab.saved", tab);
            if (tab.type === "empty") {
                console.log("empty");
            } else {
                fetchData(tab.file.contents);
            }
        });
    }, []);

    function toggleTable(button) {
        const container = document.getElementById("table-root");
        container.classList.toggle("toggle-hide-show");
        button.classList.toggle("show-metricsPlugin-button-active");

        if (!state.open) {
            dispatch({ type: CLICKED_BTN_WITH_WINDOW_CLOSED });
        } else {
            dispatch({ type: CLICKED_BTN_WITH_WINDOW_OPEN });
        }
    }

    // shows a click me button at the bottom part of the app
    console.log("why u running");
    return (
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
                      <MetricsApp
                          data={state.analysisData}
                          xmlFile={state.xmlData}
                          calculatedMetrics={state.metrics}
                      />,
                      document.getElementById("table-root")
                  )
                : null}
        </React.Fragment>
    );
}

//XREIAZOMAI OLA TA PITHANA ELEMENTS(APO BPMN.IO TA PAIRNW)
//KAI META VAZW TON XRHSTH NA KANEI TRACK AUTA POY THELEI[vrhka ta events]

//BPMN.IO IS WHERE THE ANSWERS ARE FOUND
