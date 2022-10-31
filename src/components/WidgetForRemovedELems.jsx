import React from "camunda-modeler-plugin-helpers/react";

export default function WidgetForRemovedElements({
    removedElements,
    setDisplayedElems,
    setRemovedElems,
}) {
    const [open, setOpen] = React.useState(true);
    const [checkedElems, setCheckedElems] = React.useState([]);

    function toggleCheckBox(elNameToAddRemoveInCheckedList, event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            //add it to the checkedElemsList
            setCheckedElems((prev) => [
                ...prev,
                elNameToAddRemoveInCheckedList,
            ]);
        } else {
            //remove it from the checkedElemsList
            setCheckedElems((prev) =>
                prev.filter((curr) => curr !== elNameToAddRemoveInCheckedList)
            );
        }
    }

    function addBackRemovedCheckedElements() {
        // setElems
        setDisplayedElems((prev) => [...prev, ...checkedElems]);
        setRemovedElems((prev) =>
            prev.filter((curr) => !checkedElems.includes(curr))
        );
        // uncheck elements
        //? bug with one tick left after clicking OK
        setCheckedElems([]);
        setOpen(false);
    }

    return (
        <div className="addremoved-widget-container">
            <button
                className="addremoved-widget-button"
                onClick={() => {
                    console.log("clicked button");
                    setOpen((prev) => {
                        console.log(prev);
                        return !prev;
                    });
                }}
            >
                {open ? "Hide " : "Show "}Removed Elements
            </button>
            <div
                className={`addremoved-menu ${
                    !open ? "toggle-hide-show" : ""
                } `}
            >
                {/* this might become its own component sometime */}
                {removedElements.map((elName) => {
                    return (
                        <div className="element-component">
                            <span className="element-name">{elName}</span>
                            <input
                                type="checkbox"
                                className="element-checkbox"
                                onChange={(evt) => toggleCheckBox(elName, evt)}
                            />
                        </div>
                    );
                })}
                <button
                    className="addremoved-okbutton"
                    onClick={() => addBackRemovedCheckedElements()}
                >
                    OK
                </button>
            </div>
        </div>
    );
}
