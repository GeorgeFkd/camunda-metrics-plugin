import React from "react";
import { MetricGroup } from "../../../assets/typed-constants";
// import Metric from '../../../utils/metrics/Metric-Class';
import metricResultsToText from "../../../utils/metricResultsToText";
import CamundaContext from "../../../contexts/CamundaContext";
interface CopyResultsProps {
    xmlDoc: Document;
    metricGroups: MetricGroup[];
}

function CopyResultsButton({ xmlDoc, metricGroups }: CopyResultsProps) {
    // i could make an overlay that gives choice to the user but not needed
    const {displayNotification} = React.useContext(CamundaContext);
    const [btnText,setBtnText] = React.useState("Copy Results");
    function onCopySuccess() {
      //display success notification
      setBtnText("Results Copied!")
      displayNotification({content:"Results copied To clipboard successfully!",title:"Copy Results",duration:2000,type:"success"})
      setTimeout(()=>{
      setBtnText("Copy Results")},2000)
      //triggerCamundaAction("display-notification");
    }
    function onCopyFailure() {
      setBtnText("Copying Unsuccesfull");
      displayNotification({content:"Results could not be copied to clipboard.",title:"Copy Results",duration:2000,type:"error"})
      setTimeout(()=>{
      setBtnText("Copy Results")},2000)
    }
    function onClickBtn() {
        //useCallback can be used if i pass the xmlDoc and metricGroups as param
        const metricGroupsWithCalculatedResults = calculateMetricsResults(
            xmlDoc,
            metricGroups
        );
        const metricGroupsResult = metricResultsToText(
            metricGroupsWithCalculatedResults
        );
        
        navigator.clipboard.writeText(metricGroupsResult).then(
            onCopySuccess,
            onCopyFailure
        );
    }

    return (
        <button className="btn btn-primary" onClick={() => onClickBtn()} disabled={btnText !== "Copy Results"}>
            {btnText}
        </button>
    );
}

function calculateMetricsResults(
    xmlDoc: Document,
    metricGroups: MetricGroup[]
): MetricGroup[] {
    metricGroups.forEach(({ metrics: metricsInGroup }) => {
        metricsInGroup.forEach((metric) =>
            metric.calculateAndUpdateResult(xmlDoc)
        );
    });
    console.log("ALL METRIC GROUPS WITH RESULTS");
    return metricGroups;
}
export default CopyResultsButton;
