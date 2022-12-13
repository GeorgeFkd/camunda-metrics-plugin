import React from "camunda-modeler-plugin-helpers/react";
import { render } from "react-dom";
import { Fill } from "camunda-modeler-plugin-helpers/components";
import MetricsApp from "./MetricsApp";
import app_styles from "./App.css";
import CamundaContext from "../contexts/CamundaContext";
export default function MetricsPlugin(props) {
    console.log(props, "might be good for context");
    const { config, subscribe, triggerAction } = props;
    const [open, setOpen] = React.useState(false);
    //old way: getting the subscribe function creating a huge state and passing it down
    //new way: context for subscribe and then whoever wants to subscribes
    React.useEffect(() => {
        //pairnw thn bara katw katw,vazw ena element prin apo authn
        //kai ekei mesa kanw meta render ton pinaka me auta pou thelw(cant do sth cleaner yet)
        const statusBar = document.getElementsByTagName("footer")[0];
        const rootDiv = document.createElement("div");
        rootDiv.id = "table-root";
        rootDiv.className = app_styles.toggleHideShow;
        statusBar.parentNode.insertBefore(rootDiv, statusBar);
    }, []);

    function toggleTable(button) {
        const container = document.getElementById("table-root");
        container.classList.toggle(app_styles.toggleHideShow);
        button.classList.toggle(app_styles.showMetricsPluginButtonActive);
        setOpen((isOpen) => !isOpen);
    }

    return (
        <React.Fragment>
            {/* yparxei kai to slot toolbar */}
            {/* // shows a click me button at the bottom part of the app */}
            <Fill slot="status-bar__app" group="1_autosave" priority={100}>
                <button
                    className={`${app_styles.showMetricsPluginButton}`}
                    onClick={({ target }) => toggleTable(target)}
                >
                    Metrics
                </button>
            </Fill>
            {open
                ? render(
                      <CamundaContext.Provider
                          value={{
                              subscribeToCamundaEvent: subscribe,
                              triggerCamundaAction: triggerAction,
                          }}
                      >
                          <MetricsApp />
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
