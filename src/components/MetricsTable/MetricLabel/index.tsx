import React, {RefObject} from "react";
import Metric from "../../../utils/metrics/Metric-Class";
import {Spinner} from "../../Spinner";
import styles from "./MetricLabel.css";
import {Overlay} from "camunda-modeler-plugin-helpers/components";
import {MetricGroup} from "../../../assets/typed-constants";
import EditGroup from "../MetricsTableHeader/ConfigureGroups/ModifyGroupsOverlay/EditGroup";
import InfoIcon from "../../InfoIcon";

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
                        label={`How ${metric.label} is calculated`}
                        onClick={() => setShowInfo((show: boolean) => !show)}
                    />

                    {showInfo && (
                        <MetricInformationOverlay
                            data={{metric, anchor: btnRefForOverlay.current, onClose: () => setShowInfo(false)}}/>
                    )}
                </div>
            )}
        </div>
    );
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
