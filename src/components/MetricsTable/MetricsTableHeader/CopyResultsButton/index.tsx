import React from "react";
import { MetricGroup } from "../../../../assets/typed-constants";
// import Metric from '../../../utils/metrics/Metric-Class';
import metricResultsToText,{calculateMetricsResults} from "../../../../utils/metricResultsToText";
import CamundaContext from "../../../../contexts/CamundaContext";
import useStore from "../../../../store/store";
import { METRICS_TABLE_TEXT } from "../../../../assets/text_content";
interface CopyResultsProps {
    metricGroups: MetricGroup[];
}

function CopyResultsButton({  metricGroups }: CopyResultsProps) {
    // i could make an overlay that gives choice to the user but not needed
    const {displayNotification} = React.useContext(CamundaContext);
    const [btnText,setBtnText] = React.useState(METRICS_TABLE_TEXT.COPY_RESULTS_BTN);
    const xmlDoc = useStore((state)=>state.xmlDoc)
    function onCopySuccess() {
      //display success notification
      setBtnText(METRICS_TABLE_TEXT.COPY_RESULTS_BTN_SUCCESS)
      displayNotification({content:"Results copied To clipboard successfully!",title:"Copy Results",duration:2000,type:"success"})
      setTimeout(()=>{
      setBtnText(METRICS_TABLE_TEXT.COPY_RESULTS_BTN)},2000)
      //triggerCamundaAction("display-notification");
    }
    function onCopyFailure() {
      setBtnText(METRICS_TABLE_TEXT.COPY_RESULTS_BTN_ERROR);
      displayNotification({content:"Results could not be copied to clipboard.",title:"Copy Results",duration:2000,type:"error"})
      setTimeout(()=>{
      setBtnText(METRICS_TABLE_TEXT.COPY_RESULTS_BTN)},2000)
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
        <button className="btn btn-primary" onClick={() => onClickBtn()} disabled={btnText !== METRICS_TABLE_TEXT.COPY_RESULTS_BTN}>
            {btnText}
        </button>
    );
}


export default CopyResultsButton;
