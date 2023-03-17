import React from "react";
import SelectSubProcessOverlay from "./SelectSubprocessOverlay";
import useStore from "../../../../store/store";
import { getParticipants } from "../../../../utils/metrics/utils";

function SelectSubprocess() {
    const xmlDoc = useStore((state) => state.xmlDoc);
    const selectSubProcessRef = React.useRef<HTMLButtonElement>(null);
    const [selectProcessOpen, setSelectProcessOpen] = React.useState(false);
    const setParticipant = useStore((state) => state.setParticipant);
    const participants = getParticipants(xmlDoc);
    return (
        <>
            <button
                className="btn btn-primary"
                ref={selectSubProcessRef}
                onClick={() => setSelectProcessOpen((isOpen) => !isOpen)}
            >
                Select Pool
            </button>
            {selectProcessOpen && (
                <SelectSubProcessOverlay
                    anchor={selectSubProcessRef.current}
                    onClose={() => setSelectProcessOpen(false)}
                    onSubmit={setParticipant}
                    options={participants}
                />
            )}
        </>
    );
}

export default SelectSubprocess;
