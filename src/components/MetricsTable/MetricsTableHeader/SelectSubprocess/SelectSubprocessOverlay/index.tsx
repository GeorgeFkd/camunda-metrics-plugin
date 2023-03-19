import React from "react";
import { Overlay } from "camunda-modeler-plugin-helpers/components";
import { Participant } from "../../../../../store/store";
import styles from "./SelectSubprocessOverlay.css";
import { STATS_TABLE_TEXT } from "../../../../../assets/text_content";
interface ISelectSubProcessOverlayProps {
    anchor: HTMLElement | HTMLButtonElement | null;
    onClose: () => void;
    onSubmit: (p: Participant) => void;
    options: Participant[];
    //{name:string,processRef:string}
}

function SelectSubProcessOverlay({
    anchor,
    onClose,
    onSubmit,
    options,
}: ISelectSubProcessOverlayProps) {
    return (
        <Overlay anchor={anchor} onClose={onClose}>
            <Overlay.Title>Choose Process to calculate Metrics</Overlay.Title>
            <Overlay.Body>
                <div className={styles.participantButtons}>
                    <span>Participants in Diagram:</span>
                    <button
                        className={`${styles.button} btn`}
                        onClick={(e) => onSubmit({ name: "", processRef: "" })}
                    >
                        {STATS_TABLE_TEXT.WHOLE_MODEL}
                    </button>
                    {options.map((option) => (
                        <button
                            className={`${styles.button} btn`}
                            onClick={(e) => {
                                onSubmit(option);
                            }}
                        >
                            {STATS_TABLE_TEXT.WITH_PARTICIPANT} {option.name}
                        </button>
                    ))}
                </div>
            </Overlay.Body>
            <Overlay.Footer>
                <button className="btn" onClick={onClose}>
                    Close
                </button>
            </Overlay.Footer>
        </Overlay>
    );
}

export default SelectSubProcessOverlay;
