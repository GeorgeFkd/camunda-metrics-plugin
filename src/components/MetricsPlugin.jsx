import React from "camunda-modeler-plugin-helpers/react";
import { render } from "react-dom";
import { Fill } from "camunda-modeler-plugin-helpers/components";
import MetricsApp from "./MetricsApp";
import app_styles from "./App.css";
import CamundaContext from "../contexts/CamundaContext";
export default function MetricsPlugin(props) {
    //getting all i need from Camunda Modeler props
    //and passing it to the CamundaContext
    const { config, subscribe, triggerAction, displayNotification } = props;
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        //getting the lower bar of the app to insert the table
        //haven't found a better way to do it
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
            {/* There are other slots such as the toolbar one but this seems to fit */}
            {/* // shows a click me button at the bottom part of the app */}
            <Fill slot="status-bar__app" group="1_autosave" priority={100}>
                <button
                    className={app_styles.showMetricsPluginButton}
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
                              displayNotification: displayNotification,
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
