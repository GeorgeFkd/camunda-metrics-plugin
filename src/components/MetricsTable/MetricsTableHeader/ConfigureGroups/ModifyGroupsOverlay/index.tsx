import React from "react";
import { Overlay, Section } from "camunda-modeler-plugin-helpers/components";
import styles from "./Overlay.css";
import availableMetrics from "../../../../../utils/metrics/all";
import { MetricGroup } from "../../../../../assets/typed-constants";
import Metric from "../../../../../utils/metrics/Metric-Class";
import EditGroup from "./EditGroup";
const OFFSET = { left: 0 };
interface ConfigureMetricsOverlayProps {
    anchor: HTMLElement | HTMLButtonElement | null;
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
    

    function getUniqueGroupNamesFromFormData(data:FormData){
        const groupNamesSet: Set<string> = new Set();
        for(let [nameOfGroup,metricName] of data.entries()){
            groupNamesSet.add(nameOfGroup);
        }
        return groupNamesSet;
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const groupNames:Set<string> = getUniqueGroupNamesFromFormData(formData)
        let groupsToSubmit: MetricGroup[] = Array.from(groupNames).map((groupName) => {
            return { name: groupName, metrics: new Array<Metric>() };
        });
        for (let [groupName, metricName] of formData.entries()) {
            const groupObj = groupsToSubmit.find((group) => group.name === groupName)!;
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

        onSubmit(groupsToSubmit);
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
                                   
                                    key={group.name}
                                    onRemoveGroup={removeExistingGroup}
                                />
                            );
                        })}
                        <button onClick={createEmptyGroup}>Add Group</button>
                    </div>
                </form>
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



//? Available events

export default CustomOverlay;
