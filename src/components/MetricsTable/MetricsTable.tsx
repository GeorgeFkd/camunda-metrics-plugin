import React from "camunda-modeler-plugin-helpers/react";
import { CategoriesHookContext } from "../../contexts/CategoriesContext";
import CategoryTree from "../../deprecated/CategoryTree";
import Metric from "../../utils/metrics/Metric-Class";
import { CATEGORIES, MetricGroup } from "../../assets/typed-constants";
import CATEGORIES_WITH_METRICS from "../../utils/metrics/init_metrics";
import { parser } from "../../assets/config";
import "./MetricsTable.css"
import useSubscribe from "../../hooks/useSubscribe";
// import MetricLabel from "../../deprecated/MetricLabel";
function MetricsTable({xml}:{xml:string}) {
    //TODO auto me tis cathgories pou mou eipane
    //epishs oi metrikes katatassontai kai se kathgories loipon
    //const [categoriesState] = React.useContext(CategoriesHookContext);
    //i have to prepare my data
    //? explaining adding and removing Metrics/Categories
    //* to add/remove a metric we need the whole path to the metric
    //* to add/remove a category we need the path to the category above
    //* the category we want to remove(thats why for categories we dont need to add in path)
    // React.useEffect(() => {
    //     console.log("CATEGORY STATE IN METRICS TABLE UPDATED", categoriesState);
    // }, [categoriesState]);
    // useSubscribe("app.activeTabChanged",(dataFromEvent)=>{
    //     console.log(dataFromEvent)
    //     console.log("dem hooks")
    //     return ;
    // })
    return (
        <div className="metrics-container">
            <MetricsTableTitle />
            <div className="metrics-table">
                {/* FOR NOW IM GONNA SWITCH IT UP */}
                
                {CATEGORIES_WITH_METRICS.map((MetricGroup) => {
                    return <MetricGroupContainer metricGroup={MetricGroup} xml={xml}/>;
                })}
            </div>
        </div>
    );
}

function MetricsTableTitle({}) {
    return <div className="metrics-table-title">BPMN Metrics</div>;
}
interface MetricGroupContainerProps{
    metricGroup:MetricGroup;
    xml:string
}
const  MetricGroupContainer = ({ metricGroup,xml }:MetricGroupContainerProps) => {
    const parsedDocument = parser.parseFromString(xml);
    return (
        <div className="metrics-wrapper" style={{height:"195px"}}>
            <div className="metrics-wrapper-title">
                <span className="metrics-wrapper-title-name">
                    {metricGroup.name}
                </span>
            </div>
            <div className="metrics-wrapper-children">
                {metricGroup.metrics.map((metric) => (
                   <MetricLabel metric={metric} xmlDoc={parsedDocument}/> 
                ))}
            </div>
        </div>
    );
}


const MetricLabel = ({metric,xmlDoc}:{metric:Metric,xmlDoc:Document}) =>{
    const [metricResult,setMetricResult] = React.useState(-1);
    const [isLoading,setIsLoading] = React.useState(true);
    React.useEffect(()=>{
        //here we calculate the metric,when it is loading display spinner
        setIsLoading(true);
        //gotta see if this works
        metric.calculateAndUpdateResult(xmlDoc);
        setIsLoading(false);
        
    },[xmlDoc])
    return (<div className="metric-element">
        <span className="metric-element-name">{metric.label}: &nbsp;</span>
        {isLoading ? <Spinner /> :<span className="metric-element-result">{metric.result.toFixed(2)}</span>}
    </div>);
}

const Spinner = () =>{
    return (<div>Spin</div>)
}

//for categoriescontainer and metricscontainer
const RemoveElementBtn = ({ onClickFn }:({onClickFn:()=>void}) ) => {
    return (
        <button className="metrics-wrapper-title-remove" onClick={onClickFn}>
            X
        </button>
    );
}

export default MetricsTable;
