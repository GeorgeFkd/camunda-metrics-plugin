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
// import MetricLabel from "../../deprecated/MetricLabel";
// { xml }: { xml: string } props
function MetricsTable() {
    //? explaining adding and removing Metrics/Categories
    //* to add/remove a metric we need the whole path to the metric
    //* to add/remove a category we need the path to the category above
    //* the category we want to remove(thats why for categories we dont need to add in path)
    const [xmlDoc,setXmlDoc] = React.useState({});
    const { triggerCamundaAction } = React.useCallback(
        React.useContext(CamundaContext),
        []
    );
    const parserRef = React.useRef(new DOMParser());
    React.useEffect(() => {
        //this is needed to trigger a rerender
        //on the first mount so that i have subscribed to the events
        //to actually react to them
        console.log(triggerCamundaAction, "trig");
        triggerCamundaAction("save").then((tab:any) => {
            if (!tab) {
                console.error("failed to save");
            }
            console.log("tab");
        });
    }, []);

    useSubscribe("tab.saved", (dataFromEvent) => {
        // console.log("dem hooks v2", dataFromEvent.tab);
        console.log("tab was saved in Metrics table");
        
        if (dataFromEvent.tab.type === "empty") {
            console.log("tab is empty do nothing");
        } else {
            const parsedDocument = parserRef.current.parseFromString(
                dataFromEvent.tab.file.contents
            );
            // console.log(parsedDocument);
            console.log("name of tab:",dataFromEvent.tab.name)
            setXmlDoc(parsedDocument)
            
        }
    });
    useSubscribe("app.activeTabChanged", (dataFromEvent) => {
        //console.log("dem hooks v2", dataFromEvent.activeTab.file.contents);
        console.log("active Tab Changed in Metrics Table");
        if (dataFromEvent.activeTab.type === "empty") {
            console.log("tab is empty do nothing");
        } else {
            const parsedDocument = parserRef.current.parseFromString(
                dataFromEvent.activeTab.file.contents
            );
            // console.log(parsedDocument);
            console.log("name of tab",dataFromEvent.activeTab.name)
            setXmlDoc(parsedDocument)
        }
    });

    console.log("current doc",xmlDoc)
    return (
        <div className={styles.metricsContainer}>
            <MetricsTableTitle />
            <div className={styles.metricsTable}>
                {/* FOR NOW IM GONNA SWITCH IT UP */}

                {CATEGORIES_WITH_METRICS.map((MetricGroup) => {
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
    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}
interface MetricGroupContainerProps {
    metricGroup: MetricGroup;
    xmlDoc: Document;
}
const MetricGroupContainer = ({
    metricGroup,
    xmlDoc,
}: MetricGroupContainerProps) => {
    
    return (
        <div className={styles.metricsWrapper} style={{ height: "195px" }}>
            <div className={styles.metricsWrapperTitle}>
                <span className={styles.metricsWrapperTitleName}>
                    {metricGroup.name}
                </span>
            </div>
            <div className={`${styles.metricsWrapperChildren}`}>
                {metricGroup.metrics.map((metric) => (
                    <MetricLabel metric={metric} xmlDoc={xmlDoc} />
                ))}
            </div>
        </div>
    );
};

const MetricLabel = ({
    metric,
    xmlDoc,
}: {
    metric: Metric;
    xmlDoc: Document;
}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [result,setResult] = React.useState(metric.result)
    React.useEffect(() => {
        //here we calculate the metric,when it is loading display spinner
        console.time("Metric: " + metric.label);
        setIsLoading(true);
        metric.calculateAndUpdateResult(xmlDoc);
        setIsLoading(false);
        setResult(metric.result);
        console.timeEnd("Metric: " + metric.label)
    },[xmlDoc]);
    return (
        <div className={styles.metricElement}>
            <span className="metric-element-name">{metric.label}: &nbsp;</span>
            {isLoading ? (
                <Spinner />
            ) : (
                <span className="metric-element-result">
                    {result.toFixed(2)}
                </span>
            )}
        </div>
    );
};
//for categoriescontainer and metricscontainer
const RemoveElementBtn = ({ onClickFn }: { onClickFn: () => void }) => {
    return (
        <button className="metrics-wrapper-title-remove" onClick={onClickFn}>
            X
        </button>
    );
};

export default MetricsTable;
