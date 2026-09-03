import React from "react";
import { Overlay, Section } from "camunda-modeler-plugin-helpers/components";
import styles from "./Overlay.css";
import availableMetrics from "../../../../../utils/metrics/all";
import { MetricGroup } from "../../../../../assets/typed-constants";
import Metric from "../../../../../utils/metrics/Metric-Class";
import EditGroup from "./EditGroup";
import InfoIcon from "../../../../InfoIcon";
const OFFSET = { left: 0 };
interface ConfigureMetricsOverlayProps {
    anchor: HTMLElement | HTMLButtonElement | null;
    onClose: () => void;
    existingGroups: MetricGroup[];
    //true when the active diagram is unsaved: its config can only be stored as
    //the global default, so the toggle is forced on and locked.
    forceDefault?: boolean;
    onSubmit: (finalObj: MetricGroup[], asDefault: boolean) => void;
    onReset: () => void;
}

function CustomOverlay({
    anchor,
    onClose,
    existingGroups,
    forceDefault = false,
    onSubmit,
    onReset,
}: ConfigureMetricsOverlayProps) {
    const [groups, setGroups] = React.useState(existingGroups);
    const [asDefault, setAsDefault] = React.useState(false);
    const [showResetInfo, setShowResetInfo] = React.useState(false);
    const resetInfoAnchorRef = React.useRef<HTMLSpanElement>(null);
    const useAsDefault = forceDefault || asDefault;
    //the e type is workaround bcs i dont have typechecking

    function getUniqueGroupNamesFromFormData(data: FormData) {
        const groupNamesSet: Set<string> = new Set();
        for (let [nameOfGroup, metricName] of data.entries()) {
            groupNamesSet.add(nameOfGroup);
        }
        return groupNamesSet;
    }

    //TODO: fix the explicit any type
    function handleSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const groupNames: Set<string> =
            getUniqueGroupNamesFromFormData(formData);
        let groupsToSubmit: MetricGroup[] = Array.from(groupNames).map(
            (groupName) => {
                return { name: groupName, metrics: new Array<Metric>() };
            }
        );
        for (let [groupName, metricName] of formData.entries()) {
            const groupObj = groupsToSubmit.find(
                (group) => group.name === groupName
            )!;
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

        onSubmit(groupsToSubmit, useAsDefault);
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
                <label className={styles.defaultToggle}>
                    <input
                        type="checkbox"
                        checked={useAsDefault}
                        disabled={forceDefault}
                        onChange={(e) => setAsDefault(e.target.checked)}
                    />
                    Also set as default for new diagrams
                </label>
                <p className={styles.defaultHint}>
                    {forceDefault
                        ? "This diagram isn't saved yet, so these groups are stored as the default that new diagrams start from."
                        : "When checked, new diagrams start from these groups instead of the built-in ones."}
                </p>
                <div className={styles.resetRow}>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onReset}
                    >
                        Reset groups
                    </button>
                    <span
                        ref={resetInfoAnchorRef}
                        className={styles.resetInfoAnchor}
                    >
                        <InfoIcon
                            label="What does Reset groups do?"
                            onClick={() =>
                                setShowResetInfo((show: boolean) => !show)
                            }
                        />
                    </span>
                    {showResetInfo && (
                        <Overlay
                            anchor={resetInfoAnchorRef.current}
                            onClose={() => setShowResetInfo(false)}
                            offset={OFFSET}
                        >
                            <Overlay.Title>Reset groups</Overlay.Title>
                            <Overlay.Body>
                                Discards the groups saved for the current diagram
                                and restores what a fresh open would show: the
                                default you set for new diagrams if there is one,
                                otherwise the built-in groups. For a diagram that
                                hasn't been saved yet, it clears that default
                                instead.
                            </Overlay.Body>
                        </Overlay>
                    )}
                </div>
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

export default CustomOverlay;
