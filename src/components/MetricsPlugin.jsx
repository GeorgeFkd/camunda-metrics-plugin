import React from "camunda-modeler-plugin-helpers/react";
import { render } from "react-dom";
import { Fill } from "camunda-modeler-plugin-helpers/components";
import calculateAllMetrics, {
    analyzeXMLString,
} from "../utils/analyzeXMLString";
import CalculateAllMetricsOptimized from "../utils/CalculateAllMetricsCombined";
//needs the .jsx for some reason
import MetricsApp from "./MetricsApp";
import app_styles from "./App.css";
import CamundaContext from "../contexts/CamundaContext";
const CLICKED_BTN_WITH_WINDOW_CLOSED = "NOT_OPEN_WINDOW";
const CLICKED_BTN_WITH_WINDOW_OPEN = "OPEN_WINDOW";
const DATA_FETCHED = "FETCHED_DATA";
export default function MetricsPlugin(props) {
    console.log(props, "might be good for context");
    const { config, subscribe, triggerAction } = props;
    const [state, dispatch] = React.useReducer(reducer, {
        open: false,
        analysisData: new Map(),
        xmlData: "",
    });

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
                // console.time("XML analysis not combined");
                // const calculatedMetrics = calculateAllMetrics(action.payload);
                // console.timeEnd("XML analysis not combined");

                // console.time("XML analysis optimised");
                // const calculatedMetrics = CalculateAllMetricsOptimized(
                //     action.payload
                // );
                // console.timeEnd("XML analysis optimised");
                return {
                    ...state,
                    //analysisData: calculatedMetrics.get("XML DATA COUNT"),
                    xmlData: action.payload,
                    //metrics: calculatedMetrics,
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
        rootDiv.className = app_styles.toggleHideShow;
        statusBar.parentNode.insertBefore(rootDiv, statusBar);
        //if it is ever needed again i can bring back the subscribes here
        //! it feels faster
    }, []);

    function toggleTable(button) {
        const container = document.getElementById("table-root");
        container.classList.toggle(app_styles.toggleHideShow);
        button.classList.toggle(app_styles.showMetricsPluginButtonActive);

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
                    className={`${app_styles.showMetricsPluginButton}`}
                    onClick={({ target }) => toggleTable(target)}
                >
                    Metrics
                </button>
            </Fill>

            {state.open
                ? render(
                      <CamundaContext.Provider
                          value={{
                              subscribeToCamundaEvent: subscribe,
                              triggerCamundaAction: triggerAction,
                          }}
                      >
                          <MetricsApp
                              data={state.analysisData}
                              xmlFile={state.xmlData}
                          />
                      </CamundaContext.Provider>,
                      document.getElementById("table-root")
                  )
                : null}
        </React.Fragment>
    );
}

//XREIAZOMAI OLA TA PITHANA ELEMENTS(APO BPMN.IO TA PAIRNW)
//KAI META VAZW TON XRHSTH NA KANEI TRACK AUTA POY THELEI[vrhka ta events]

//BPMN.IO IS WHERE THE ANSWERS ARE FOUND
