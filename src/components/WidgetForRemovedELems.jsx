import React from "camunda-modeler-plugin-helpers/react"


export default function WidgetForRemovedElements({
    removedElements,
    setDisplayedElems,
    setRemovedElems,
}) {
    //gets the removed Elements
    //clicking the widget should display a tiny board
    // with checkboxes of the elements removed and an ok element to bring them back
    //this also needs an icon
    //otan pataw ok na to kleinei gia na mhn exw themata kai pio aneto
    const [open, setOpen] = React.useState(true);
    const [checkedElems, setCheckedElems] = React.useState([]);

    function toggleCheckBox(elNameToAddRemoveInCheckedList, event) {
        const isChecked = event.target.checked;
        console.log(isChecked);
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
        setCheckedElems([]);
        setOpen((prev) => false);
        console.log("currently", open);
        // uncheck e
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
                Removed Elements
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