import React from "camunda-modeler-plugin-helpers/react";
import { Overlay, Section } from "camunda-modeler-plugin-helpers/components";
import styles from "./Overlay.css";
import availableMetrics from "../../utils/metrics/all";
import { MetricGroup } from "../../assets/typed-constants";
import Metric from "../../utils/metrics/Metric-Class";
const OFFSET = { left: 0 };
interface ConfigureMetricsOverlayProps {
    anchor: HTMLElement;
    onClose: () => void;
    existingGroups: MetricGroup[];
    onSubmit: (finalObj: MetricGroup[]) => void;
}

function CustomOverlay({
    anchor,
    onClose,
    existingGroups,
    onSubmit,
}: ConfigureMetricsOverlayProps) {
    //MetricGroup-> name:string,metrics:Metric[]
    //!
    //* this will take some state as input (arr[{name:"X",metrics:[new Metric()]}])
    //* use it to render components that have an editable group name
    //* for the name to be editable there will be some state here that will be initialised
    //* with the input received and then as the user is writing on the name the onChange
    //* event will change the value of this specific one
    //* onChangeSelect will remove/add metrics from the specific object (based on name filtering it out)

    const [groups, setGroups] = React.useState(existingGroups);
    //the e type is workaround bcs i dont have typechecking
    function onSelect(
        e: { target: { selectedOptions: HTMLOptionElement[] } },
        currentGroup: MetricGroup
    ) {
        console.log(e.target.selectedOptions, currentGroup);
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option: HTMLOptionElement) => {
                //returns the dom element
                console.log(option);
                return option.value;
            }
        );
        console.log(selectedOptions);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const groupNamesSet: Set<string> = new Set();
        for (let pair of formData.entries()) {
            console.log(pair[0], ": ", pair[1]);
            groupNamesSet.add(pair[0]);
        }
        let obj: MetricGroup[] = Array.from(groupNamesSet).map((groupName) => {
            return { name: groupName, metrics: new Array<Metric>() };
        });
        for (let [groupName, metricName] of formData.entries()) {
            const groupObj = obj.find((group) => group.name === groupName)!;
            const metricObj = availableMetrics.find(
                (metric) => metric.label === metricName
            );
            console.log(metricObj, "goes in ", groupObj);
            if (metricObj !== undefined) {
                groupObj.metrics.push(metricObj);
            } else {
                console.error("Metric Obj was not found");
            }
        }

        onSubmit(obj);
        onClose();
    }

    function createEmptyGroup() {
        setGroups((prev: MetricGroup[]) => [
            ...prev,
            { name: "edit this", metrics: new Array<Metric>() },
        ]);
    }
    function removeExistingGroup(e: any, nameOfGroupToBeRemoved: string) {
        setGroups((prev: MetricGroup[]) => {
            console.log(prev, nameOfGroupToBeRemoved, "REMOVAL");
            return prev.filter((mgroup) => {
                return mgroup.name !== nameOfGroupToBeRemoved;
            });
        });
    }

    // app.tabsChanged
    return (
        <Overlay anchor={anchor} onClose={onClose} offset={OFFSET}>
            <Overlay.Title>Configure Metric Groups</Overlay.Title>
            <Overlay.Body>
                <form id="groups-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.formContainer}>
                        {groups.map((group: MetricGroup) => {
                            return (
                                <EditGroup
                                    group={group}
                                    onChangeSelect={onSelect}
                                    key={group.name}
                                    onRemoveGroup={removeExistingGroup}
                                />
                            );
                        })}
                        <button onClick={createEmptyGroup}>Add Group</button>
                    </div>
                </form>
                {/* user should be able to create groups and add metrics(display all available metrics) to them */}
                {/* modify the names of existing groups */}
                {/* add and remove metrics from existing groups */}
            </Overlay.Body>
            <Overlay.Footer>
                <button
                    className="btn btn-primary"
                    type="submit"
                    form="groups-form"
                >
                    Submit
                </button>
            </Overlay.Footer>
        </Overlay>
    );
}




interface EditGroupProps {
    group: MetricGroup;
    onChangeSelect: (e: any, group: MetricGroup) => void;
    onRemoveGroup: (e: any, groupToBeRemoved: string) => void;
}
function EditGroup({ group, onChangeSelect, onRemoveGroup }: EditGroupProps) {
    const [isBeingEdited, setIsBeingEdited] = React.useState(false);
    const [nameOfGroup, setNameOfGroup] = React.useState(group.name);
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (isBeingEdited) {
            ref.current.focus();
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
            {/* the editable name thing can be done as a span that when clicked on is turned into an input and focused */}
            {/* <label htmlFor={group.name}>{group.name}</label> */}

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
                onChange={(e) => onChangeSelect(e, nameOfGroup)}
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
            {/* <MetricsDropdown
                MGroup={group}
                selectElement={() => {}}
                unselectElement={() => {}}
                key={group.name}
            /> */}
            <button
                onClick={(e) => onRemoveGroup(e, nameOfGroup)}
                type="button"
            >
                Remove
            </button>
        </div>
    );
}

//? Available events

export default CustomOverlay;
