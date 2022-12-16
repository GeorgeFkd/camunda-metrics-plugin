import React from "camunda-modeler-plugin-helpers/react";
import { CategoriesHookContext } from "../../contexts/CategoriesContext";
import CategoryTree from "../../deprecated/CategoryTree";
import Metric from "../../utils/metrics/Metric-Class";
import { CATEGORIES, MetricGroup } from "../../assets/typed-constants";
import CATEGORIES_WITH_METRICS from "../../utils/metrics/init_metrics";
import { parser } from "../../assets/config";
import useSubscribe from "../../hooks/useSubscribe";
import styles from "./MetricsTable.css";
import spinner from "./Spinner.css";
import { Spinner } from "../Spinner";
import CamundaContext from "../../contexts/CamundaContext";
import { DOMParser } from "xmldom";
import MetricLabel from "./MetricLabel";
import MetricGroupContainer from "./MetricGroupContainer";
import CustomOverlay from "../ModifyGroupsOverlay";
// import MetricLabel from "../../deprecated/MetricLabel";
// { xml }: { xml: string } props
function MetricsTable() {
    //!HOW WILL THE CONFIGURE GROUPS THING WORK
    //here there will be a state with initial one the default
    //this state will be passed to the overlay
    //the overlay will return sth
    //this sth will reflect back on state

    const [xmlDoc, setXmlDoc] = React.useState({});
    const { triggerCamundaAction } = React.useCallback(
        React.useContext(CamundaContext),
        []
    );
    const [metricGroups,setMetricGroups] = React.useState(CATEGORIES_WITH_METRICS)
    const [configOpen, setConfigOpen] = React.useState(false);
    const titleRef = React.useRef(null);
    const parserRef = React.useRef(new DOMParser());
    //? some attention to this somewhen
    React.useEffect(() => {
        //this is needed to trigger a rerender
        //on the first mount so that i have subscribed to the events
        //to actually react to them
        console.log(triggerCamundaAction, "trig");
        triggerCamundaAction("save").then((tab: any) => {
            if (!tab) {
                console.error("failed to save");
            }
            console.log("tab");
        });
    }, []);

    useSubscribe("tab.saved", (dataFromEvent) => {
        //console.log("tab was saved in Metrics table",dataFromEvent);
        if (dataFromEvent.tab.type === "empty") return;
        const parsedDocument = parserRef.current.parseFromString(
            dataFromEvent.tab.file.contents
        );
        setXmlDoc(parsedDocument);
    });
    useSubscribe("app.activeTabChanged", (dataFromEvent) => {
        // console.log("active Tab Changed in Metrics Table",dataFromEvent);
        if (dataFromEvent.activeTab.type === "empty") return;
        const parsedDocument = parserRef.current.parseFromString(
            dataFromEvent.activeTab.file.contents
        );
        setXmlDoc(parsedDocument);
    });

    function updateGroups(newGroups:MetricGroup[]){
        setMetricGroups(newGroups)
    }

    console.log("current doc", xmlDoc);
    return (
        <div className={styles.metricsContainer}>
            {/*TODO-> PUT HEADER HERE THAT CONTAINS THE TITLE THE CONFIGURE GROUPS AND THE COPY TO CLIPBOARD */}
            <div className={styles.metricsHeader}>
            
            <MetricsTableTitle />
            <button
                ref={titleRef}
                onClick={() => setConfigOpen((prev: boolean) => !prev)}
                >
                Configure Groups
            </button>
                </div>
            {configOpen && (
                <CustomOverlay
                    anchor={titleRef.current}
                    existingGroups={metricGroups}
                    onClose={() => setConfigOpen(false)}
                    onSubmit={updateGroups}
                />
            )}

            <div className={styles.metricsTable}>
                {/* this will soon be context */}
                {metricGroups.map((MetricGroup:MetricGroup) => {
                    return (
                        <MetricGroupContainer
                            metricGroup={MetricGroup}
                            xmlDoc={xmlDoc}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function MetricsTableTitle({}) {
    const [configOpen, setConfigOpen] = React.useState(false);
    const titleRef = React.useRef(null);

    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}

//for categoriescontainer and metricscontainer
const RemoveElementBtn = ({ onClickFn }: { onClickFn: () => void }) => {
    return (
        <button className="metrics-wrapper-title-remove" onClick={onClickFn}>
            X
        </button>
    );
};

export default MetricsTable;
