import React from "camunda-modeler-plugin-helpers/react";
import { createPortal } from "react-dom";
import { Fill } from "camunda-modeler-plugin-helpers/components";
import MetricsApp from "./MetricsApp";
import app_styles from "./App.css";
import CamundaContext from "../contexts/CamundaContext";
import useStore from "../store/store";
import { loadMetricGroups } from "../utils/metricConfigStorage";
import CATEGORIES_WITH_METRICS from "../utils/metrics/init_metrics";
export default function MetricsPlugin(props) {
    //getting all i need from Camunda Modeler props
    //and passing it to the CamundaContext
    const { config, subscribe, triggerAction, displayNotification } = props;
    const [open, setOpen] = React.useState(false);
    const [container, setContainer] = React.useState(null);

    //stable context value: a fresh object here would re-render the whole
    //Metrics subtree every time the Modeler re-renders the plugin host
    const camundaContextValue = React.useMemo(
        () => ({
            subscribeToCamundaEvent: subscribe,
            triggerCamundaAction: triggerAction,
            displayNotification: displayNotification,
            config: config,
        }),
        [subscribe, triggerAction, displayNotification, config]
    );

    React.useEffect(() => {
        //getting the lower bar of the app to insert the table
        //haven't found a better way to do it
        const statusBar = document.getElementsByTagName("footer")[0];
        const anchor = statusBar || document.body.lastChild;
        const parent = (anchor && anchor.parentNode) || document.body;
        const rootDiv = document.createElement("div");
        rootDiv.id = "table-root";
        parent.insertBefore(rootDiv, anchor || null);
        setContainer(rootDiv);
        return () => {
            rootDiv.remove();
        };
    }, []);

    //Keep the store's XML in sync with the active tab.
    //This component is mounted for the whole session, so these subscriptions
    //live once (no leak) and we never need to force a disk save just to read
    //the current diagram - forcing "save" ran the file indexer + a Zeebe
    //connection check on every open, which froze the UI for seconds.
    React.useEffect(() => {
        if (typeof subscribe !== "function") return;
        const { changeXmlFile, updateXmlFile, setMetricGroups, setCurrentFile } =
            useStore.getState();
        //Tab switches can outrun the async config read - only the newest one
        //is allowed to write its result back into the store.
        let loadToken = 0;
        const subs = [
            subscribe("app.activeTabChanged", ({ activeTab }) => {
                if (!activeTab || activeTab.type === "empty") return;
                const file = activeTab.file || null;
                changeXmlFile((file && file.contents) || "");
                setCurrentFile(file);
                const token = ++loadToken;
                Promise.resolve(loadMetricGroups(config, file))
                    .then((groups) => {
                        if (token !== loadToken) return;
                        //no config saved for this file -> back to the defaults
                        setMetricGroups(groups || CATEGORIES_WITH_METRICS);
                    })
                    .catch(() => {});
            }),
            subscribe("tab.saved", ({ tab }) => {
                if (!tab || tab.type === "empty") return;
                updateXmlFile((tab.file && tab.file.contents) || "");
                //the first save gives a new diagram its path; keep the key current
                if (tab.file) setCurrentFile(tab.file);
            }),
        ];
        return () => {
            subs.forEach((s) => s && typeof s.cancel === "function" && s.cancel());
        };
    }, [subscribe, config]);

    function toggleOpen() {
        setOpen((isOpen) => {
            const next = !isOpen;
            //Cold-start fallback: if the panel is opened before the first save
            //or tab switch, the store is still empty - ask for a single save
            //once so the metrics have something to show.
            if (
                next &&
                !useStore.getState().xmlfile &&
                typeof triggerAction === "function"
            ) {
                Promise.resolve(triggerAction("save")).catch(() => {});
            }
            return next;
        });
    }

    return (
        <React.Fragment>
            {/* There are other slots such as the toolbar one but this seems to fit */}
            {/* // shows a click me button at the bottom part of the app */}
            <Fill slot="status-bar__app" group="1_autosave" priority={100}>
                <button
                    className={
                        open
                            ? app_styles.showMetricsPluginButtonActive
                            : app_styles.showMetricsPluginButton
                    }
                    onClick={toggleOpen}
                >
                    Metrics
                </button>
            </Fill>
            {open && container
                ? createPortal(
                      <CamundaContext.Provider value={camundaContextValue}>
                          <MetricsApp />
                      </CamundaContext.Provider>,
                      container
                  )
                : null}
        </React.Fragment>
    );
}

//XREIAZOMAI OLA TA PITHANA ELEMENTS(APO BPMN.IO TA PAIRNW)
//KAI META VAZW TON XRHSTH NA KANEI TRACK AUTA POY THELEI[vrhka ta events]

//BPMN.IO IS WHERE THE ANSWERS ARE FOUND
