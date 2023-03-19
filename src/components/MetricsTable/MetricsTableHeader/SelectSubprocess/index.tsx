import React from "react";
import SelectSubProcessOverlay from "./SelectSubprocessOverlay";
import useStore from "../../../../store/store";
import { getParticipants } from "../../../../utils/metrics/utils";

function SelectSubprocess() {
    const xmlDoc = useStore((state) => state.xmlDoc);
    const refForOverlayAnchor = React.useRef<HTMLButtonElement>(null);
    const [overlayOpen, setOverlayOpen] = React.useState(false);
    const setParticipant = useStore((state) => state.setParticipant);
    const participants = getParticipants(xmlDoc);
    return (
        <>
            <button
                className="btn btn-primary"
                ref={refForOverlayAnchor}
                onClick={() => setOverlayOpen((isOpen) => !isOpen)}
            >
                Select Pool
            </button>
            {overlayOpen && (
                <SelectSubProcessOverlay
                    anchor={refForOverlayAnchor.current}
                    onClose={() => setOverlayOpen(false)}
                    onSubmit={setParticipant}
                    options={participants}
                />
            )}
        </>
    );
}

export default SelectSubprocess;
