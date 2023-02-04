import { MetricGroup } from "../../assets/typed-constants";
import React from "react";
import styles from "./Overlay.css"
import availableMetrics from "../../utils/metrics/all";

interface EditGroupProps {
    group: MetricGroup;
    onRemoveGroup: (e: any, groupToBeRemoved: string) => void;
}
function EditGroup({ group, onRemoveGroup }: EditGroupProps) {
    const [isBeingEdited, setIsBeingEdited] = React.useState(false);
    const [nameOfGroup, setNameOfGroup] = React.useState(group.name);
    const ref = React.useRef<HTMLInputElement>(null);
    
    React.useEffect(() => {
       if (isBeingEdited) {
            if(ref.current!== null){
                ref.current.focus()
            }
        }
    }, [isBeingEdited]);
    function groupHasMetricWithName(MGroup:MetricGroup,metricName: string) {
        return (
            MGroup.metrics.filter((metric) => metric.label === metricName)
                .length > 0
        );
    }
    return (
        <div className={styles.metricGroup}>
            <input
                value={nameOfGroup}
                id={group.name}
                type="text"
                onChange={(e) => setNameOfGroup(e.target.value)}
                onBlur={(e) => setIsBeingEdited(false)}
                ref={ref}
                style={{
                    display: `${isBeingEdited ? "" : "none"}`,
                    width: "5rem",
                    font: "inherit",
                }}
            />

            <span
                onClick={() => setIsBeingEdited(true)}
                style={{
                    display: `${!isBeingEdited ? "" : "none"}`,
                    width: "5rem",
                }}
            >
                {nameOfGroup}
            </span>

            <select
                className={styles.metricDropdown}
                id={group.name}
                // this feels weird
                name={nameOfGroup}
                multiple
                required
                //onChange={(e) => onChangeSelect(e, group)}
            >
                <option value="">Select Metrics:</option>
                {availableMetrics.map((metric) => {
                    return (
                        <option
                            value={metric.label}
                            selected={groupHasMetricWithName(group,metric.label)}
                        >
                            {metric.label}
                        </option>
                    );
                })}
            </select>
            <button
                onClick={(e) => onRemoveGroup(e, nameOfGroup)}
                type="button"
            >
                Remove
            </button>
        </div>
    );
}

export default EditGroup