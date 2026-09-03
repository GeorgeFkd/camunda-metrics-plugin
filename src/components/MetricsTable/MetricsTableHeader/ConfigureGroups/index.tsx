import React from "react";
import CustomOverlay from "./ModifyGroupsOverlay";
import useStore from "../../../../store/store";
import CamundaContext from "../../../../contexts/CamundaContext";
import {
    loadMetricGroups,
    resetMetricGroups,
    saveMetricGroups,
} from "../../../../utils/metricConfigStorage";
import CATEGORIES_WITH_METRICS from "../../../../utils/metrics/init_metrics";
import { MetricGroup } from "../../../../assets/typed-constants";
import { METRICS_TABLE_TEXT } from "../../../../assets/text_content";
function ConfigureGroups() {
    const btnRefForOverlay = React.useRef<HTMLButtonElement>(null);
    const [configOpen, setConfigOpen] = React.useState(false);
    const metricGroups = useStore((state) => state.metricGroups);
    const updateGroups = useStore((state) => state.updateGroups);
    const setMetricGroups = useStore((state) => state.setMetricGroups);
    const currentFile = useStore((state) => state.currentFile);
    const { config } = React.useContext(CamundaContext);

    //an unsaved diagram has no path to key a per-file config against, so its
    //config can only be stored as the global default -> the overlay forces the
    //"set as default" toggle on in that case.
    const isUnsavedDiagram = !currentFile || !currentFile.path;

    //apply the new selection immediately and persist it so it survives a
    //restart - per file when the diagram is saved, globally (the default new
    //files start from) otherwise, or both when `asDefault` is checked.
    function handleSubmit(groups: MetricGroup[], asDefault: boolean) {
        updateGroups(groups);
        void saveMetricGroups(config, currentFile, groups, { asDefault });
    }

    //drop the stored config for this scope and show whatever a fresh open would
    //now produce (global default, then the built-in defaults).
    async function handleReset() {
        setConfigOpen(false);
        await resetMetricGroups(config, currentFile);
        const groups = await loadMetricGroups(config, currentFile);
        setMetricGroups(groups || CATEGORIES_WITH_METRICS);
    }

    return (
        <>
            <button
                ref={btnRefForOverlay}
                onClick={() => setConfigOpen((prev: boolean) => !prev)}
                className="btn btn-primary"
            >
                {METRICS_TABLE_TEXT.CONFIGURE_GROUPS_BTN}
            </button>
            {configOpen && (
                <CustomOverlay
                    anchor={btnRefForOverlay.current}
                    existingGroups={metricGroups}
                    forceDefault={isUnsavedDiagram}
                    onClose={() => setConfigOpen(false)}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                />
            )}
        </>
    );
}

export default ConfigureGroups;
