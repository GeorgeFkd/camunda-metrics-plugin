import React, {RefObject} from "react";
import Metric from "../../../utils/metrics/Metric-Class";
import {Spinner} from "../../Spinner";
import styles from "./MetricLabel.css";
import {Overlay} from "camunda-modeler-plugin-helpers/components";
import {MetricGroup} from "../../../assets/typed-constants";
import EditGroup from "../MetricsTableHeader/ConfigureGroups/ModifyGroupsOverlay/EditGroup";

const MetricLabel = ({
                         metric,
                         xmlDoc,
                     }: {
    metric: Metric;
    xmlDoc: Document;
}) => {
    const btnRefForOverlay = React.useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [result, setResult] = React.useState(metric.result);

    const [showInfo, setShowInfo] = React.useState(false);
    React.useEffect(() => {
        //Other methods have not worked
        //Changes here are welcome
        setIsLoading(true);
        const res = metric.calculateAndUpdateResult(xmlDoc);
        setIsLoading(false);
        setResult(res);
    }, [xmlDoc]);

    return (
        <div className={styles.metricElement}>
            {isLoading ? (
                <Spinner/>
            ) : (
                <div className={styles.metricElementResult}>
                    <span className={styles.metricElementName}>{metric.label}: &nbsp;</span>
                    <span>{result.toFixed(2)}</span>
                    <div ref={btnRefForOverlay}></div>
                        <InfoIcon
                        onClick={() => setShowInfo((show: boolean) => !show)}></InfoIcon>

                    {showInfo && (
                        <MetricInformationOverlay
                            data={{metric, anchor: btnRefForOverlay.current, onClose: () => setShowInfo(false)}}/>
                    )}
                </div>
            )}
        </div>
    );
}


function InfoIcon({onClick}:{onClick:()=>any}) {
    return <svg  onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path
            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
    </svg>
}


interface MetricInformationOverlayProps {
    anchor: HTMLElement | HTMLButtonElement | null | Element;
    onClose: () => void;
    metric: Metric;
}

const OFFSET = {left: 0};

function MetricInformationOverlay({data}: { data: MetricInformationOverlayProps }) {
    return <Overlay anchor={data.anchor} onClose={data.onClose} offset={OFFSET}>
        <Overlay.Title>Metric Information: {data.metric.label}</Overlay.Title>
        <Overlay.Body>
            {data.metric.tooltip}
        </Overlay.Body>
    </Overlay>

}

export default MetricLabel;
