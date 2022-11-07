import React from "camunda-modeler-plugin-helpers/react";
import useCategories from "../hooks/useCategories.jsx";
import { CategoriesHookContext } from "../contexts/CategoriesContext.jsx";

export default function WidgetForRemovedElements() {
    const [
        categoriesState,
        removeTheMetric,
        removeTheCategory,
        addCategory,
        removedElements,
        addMetric,
    ] = React.useContext(CategoriesHookContext);

    const [open, setOpen] = React.useState(true);
    const [checkedElems, setCheckedElems] = React.useState([]);
    //it doesnt subscribe to the state yes ofc it doesnt cos it is different states
    //custom hooks are for reusing logic not data

    function toggleCheckBox(elementToAddRemoveInCheckedList, event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            //add it to the checkedElemsList
            setCheckedElems((prev) => [
                ...prev,
                elementToAddRemoveInCheckedList,
            ]);
        } else {
            //remove it from the checkedElemsList
            setCheckedElems((prev) =>
                prev.filter((curr) => curr !== elementToAddRemoveInCheckedList)
            );
        }
    }

    function addBackRemovedCheckedElements() {
        console.log("All these will leave");
        console.log(checkedElems);
        checkedElems.map((elem) => {
            if (elem.type === "metric") {
                addMetric(elem.categoryPath, elem.element);
                return;
            }
            if (elem.type === "category") {
                addCategory(elem.categoryPath, elem.element);
                return;
            }
        });
        // uncheck elements(ui wise i dont even need it cos it doesnt even show)
        //? bug with one tick left after clicking OK
        setCheckedElems([]);
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
                {open ? "Hide " : "Show "}Removed Metrics/Categories
            </button>
            <div
                className={`addremoved-menu ${
                    !open ? "toggle-hide-show" : ""
                } `}
            >
                {/* this might become its own component sometime */}
                {/* i could slice it in categories and metrics */}
                {removedElements.map((element, index) => {
                    return (
                        <div className="addremoved-widget-element-component">
                            <span className="addremoved-widget-element-name">
                                {element.element.name}
                            </span>
                            <input
                                type="checkbox"
                                className="addremoved-element-checkbox"
                                id={`addremoved-element-checkbox-${index}`}
                                onChange={(evt) => toggleCheckBox(element, evt)}
                            />
                            <label
                                for={`addremoved-element-checkbox-${index}`}
                                class="addremoved-element-checkbox-label"
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
