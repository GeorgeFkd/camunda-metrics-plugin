import React from "camunda-modeler-plugin-helpers/react";
import { CategoriesHookContext } from "../../contexts/CategoriesContext.jsx";
import { addCategory, addMetric } from "../../assets/categories";
export default function WidgetForRemovedElements() {
    const [, setCategories, removedElements, setRemoved] = React.useContext(
        CategoriesHookContext
    );
    const [open, setOpen] = React.useState(true);
    const [checkedElems, setCheckedElems] = React.useState([]);

    function toggleCheckBox(elementToAddRemoveInCheckedList, event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            setCheckedElems((prev) => [
                ...prev,
                elementToAddRemoveInCheckedList,
            ]);
        } else {
            setCheckedElems((prev) =>
                prev.filter(
                    (curr) =>
                        curr.element.name !==
                        elementToAddRemoveInCheckedList.element.name
                )
            );
        }
    }

    function uncheckCheckboxesInWidget() {
        const metricsAndCategoriesBox =
            document.getElementsByClassName("addremoved-menu")[0];
        const checkboxes = metricsAndCategoriesBox.querySelector(
            "input[type='checkbox']"
        );
        Array.from(checkboxes).map((checkbox) => (checkbox.checked = false));
    }

    function addBackRemovedCheckedElements() {
        //! i have to first add the categories by shortest path
        //! and then the metrics so i dont have errors
        uncheckCheckboxesInWidget();
        checkedElems
            .sort((a, b) => {
                if (a.type === b.type) {
                    console.log("same type");
                    return a.categoryPath.length - b.categoryPath.length;
                }
                if (a.type === "category") {
                    console.log("a category b metric");
                    return -1;
                }
                console.log("a metric b metric");
                return 1;
            })
            .map((elem) => {
                setRemoved((prev) => {
                    return prev.filter((element) => {
                        console.log(element.element.name);
                        return element.element.name !== elem.element.name;
                    });
                });
                if (elem.type === "metric") {
                    setCategories((prev) => {
                        return addMetric(prev, elem.categoryPath, elem.element);
                    });
                }
                if (elem.type === "category") {
                    const actualPath = elem.categoryPath.slice(0, -1);
                    setCategories((prev) => {
                        return addCategory(prev, actualPath, elem.element);
                    });
                }
            });
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
                                index={index + 4}
                            />
                        );
                    })}
                {removedElements.some((el) => el.type === "category") ? (
                    <Line />
                ) : null}
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
                {removedElements.some((el) => el.type === "metric") ? (
                    <Line />
                ) : null}
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

function Line() {
    return (
        <div
            style={{
                marginTop: "1rem",
                height: "2px",
                borderBottom: "solid 2px black",
                width: "100%",
                marginBottom: "0.5rem",
            }}
        ></div>
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
