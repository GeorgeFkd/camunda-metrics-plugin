import React from "react";
import CustomOverlay from "./ModifyGroupsOverlay";
import useStore from "../../../../store/store";
import { METRICS_TABLE_TEXT } from "../../../../assets/text_content";
function ConfigureGroups() {
    const btnRefForOverlay = React.useRef<HTMLButtonElement>(null);
    const [configOpen, setConfigOpen] = React.useState(false);
    const metricGroups = useStore((state) => state.metricGroups);
    const updateGroups = useStore((state) => state.updateGroups);
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
                    onClose={() => setConfigOpen(false)}
                    onSubmit={updateGroups}
                />
            )}
        </>
    );
}

export default ConfigureGroups;
