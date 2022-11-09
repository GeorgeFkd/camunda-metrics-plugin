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

    React.useEffect(() => {
        console.log(checkedElems, "THESE ARE CHECKED");
    }, [checkedElems]);

    console.log(removedElements);
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
                prev.filter(
                    (curr) =>
                        curr.element.name !==
                        elementToAddRemoveInCheckedList.element.name
                )
            );
        }
    }

    function addBackRemovedCheckedElements() {
        //! i have to first add the categories by shortest path
        //! and then the metrics so i dont have errors
        console.log("before", checkedElems);
        checkedElems
            .sort((a, b) => {
                if (a.type === b.type) {
                    console.log("same type");
                    return a.categoryPath.length - b.categoryPath.length;
                }
                if (a.type === "category") {
                    console.log("a category b metric");
                    return 1;
                }
                console.log("a metric b metric");
                return -1;
                // if(a.type ==="category"){
                //     if(b.type==="category"){
                //         return a.categoryPath.length - b.categoryPath.length;
                //     }
                // }
            })
            .map((elem) => {
                console.log(elem);
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
                <h4 className="addremoved-widget-subtitle">Categories:</h4>
                {removedElements
                    .filter((elem) => elem.type === "category")
                    .map((element, index) => {
                        return (
                            <RemovedElement
                                element={element}
                                toggle={toggleCheckBox}
                                index={index}
                            />
                        );
                    })}
                <div
                    style={{
                        height: "2px",
                        backgroundColor: "black",
                        width: "100%",
                    }}
                ></div>
                <h4 className="addremoved-widget-subtitle">Metrics:</h4>
                {removedElements
                    .filter((elem) => elem.type === "metric")
                    .map((element, index) => {
                        return (
                            <RemovedElement
                                element={element}
                                toggle={toggleCheckBox}
                                index={index}
                            />
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

function RemovedElement({ element, toggle, index }) {
    return (
        <div className="addremoved-widget-element-component">
            <span className="addremoved-widget-element-name">
                {element.element.name}
            </span>
            <input
                type="checkbox"
                className="addremoved-element-checkbox"
                id={`addremoved-element-checkbox-${index}`}
                onChange={(evt) => toggle(element, evt)}
            />
            <label
                for={`addremoved-element-checkbox-${index}`}
                class="addremoved-element-checkbox-label"
            />
        </div>
    );
}
