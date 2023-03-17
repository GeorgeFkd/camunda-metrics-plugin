import React from "camunda-modeler-plugin-helpers/react";
import { CategoriesHookContext } from "../contexts/CategoriesContext";
import { addTheCategoryFR as addCategory, addMetric } from "./categories";
console.log("VERSION", React.version);
export default function WidgetForRemovedElements() {
    const [categories, setCategories, removedElements, setRemoved] =
        React.useContext(CategoriesHookContext);
    const [open, setOpen] = React.useState(true);
    const [checkedElems, setCheckedElems] = React.useState([]);
    const [flag, setFlag] = React.useState(false);

    // const useStrictModeDetector = () => {
    //     const strictModeRef = React.useRef(false);

    //     // React v17 mutes the console during the second strict-mode render with a method that has a '__reactDisabledLog' key.
    //     // React v18 dims the log message with a method that has a '__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__' key.
    //     if (
    //         "__reactDisabledLog" in console.log ||
    //         "__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__" in console.log
    //     ) {
    //         strictModeRef.current = true;
    //     }
    //     return strictModeRef.current;
    // };

    // console.log(useStrictModeDetector(), "strict");

    React.useEffect(() => {
        console.log("CATEGORIES EFFECT");
    }, [categories]);
    React.useEffect(() => {
        console.log("flag effect");
        const sortedElems = getSortedCheckedElems();
        // let fnsToCall = [];
        // sortedElems.map((elem, index) => {
        //     if (elem.type === "category") {
        //         // setCategories((prev) => {
        //         //     return addCategory(prev, elem.categoryPath, elem.element);
        //         // });
        //         fnsToCall = [
        //             ...fnsToCall,
        //             (prev) =>
        //                 addCategory.apply({}, [
        //                     prev,
        //                     elem.categoryPath,
        //                     elem.element,
        //                 ]),
        //         ];
        //     } else {
        //         // setCategories((prev) => {
        //         //     return addMetric(prev, elem.categoryPath, elem.element);
        //         // });
        //         fnsToCall = [
        //             ...fnsToCall,
        //             (prev) =>
        //                 addMetric.apply({}, [
        //                     prev,
        //                     elem.categoryPath,
        //                     elem.element,
        //                 ]),
        //         ];
        //     }
        // });
        // console.log(fnsToCall);
        // if (fnsToCall.length === 0) return;
        // //fnsToCall[0](categories);
        // //let init = fnsToCall[0](categories);
        // let prev;
        // for (let [index, fnCall] of fnsToCall.entries()) {
        //     if (index == 0) {
        //         prev = categories;
        //     }
        //     console.log(index, prev);
        //     prev = fnCall(prev);
        // }
        // console.log("we set cats to", prev);
        // let theprev = addCategory(prev, ["PLASTICITY"], {
        //     name: "RESEQ",
        //     metrics: [{ name: "mpz", result: "ouss" }],
        // });
        // let otherprev = addCategory(prev, ["MODIFIABILITY"], {
        //     name: "PAR",
        //     metrics: [],
        // });
        // console.log("we set cats to", theprev);
        // setCategories(theprev);
        //? it acts a bit weird like
        //? on the first set state the object is somehow complete
        // const sortedElems = [
        //     {
        //         type: "category",
        //         element: {
        //             name: "PLASTICITY",
        //             categories: [],
        //         },
        //         categoryPath: [],
        //     },
        //     {
        //         type: "category",
        //         element: {
        //             name: "RESEQ",
        //             metrics: [],
        //         },
        //         categoryPath: ["PLASTICITY"],
        //     },
        //     {
        //         type: "category",
        //         element: {
        //             name: "PAR",
        //             metrics: [],
        //         },
        //         categoryPath: ["PLASTICITY"],
        //     },
        // ];
        // for (let elem of sortedElems) {
        //     if (elem.type === "category") {
        //         setCategories((prev) => {
        //             console.log("THE PREV", prev);
        //             return addCategory(prev, elem.categoryPath, elem.element);
        //         });
        //     } else {
        //         setCategories((prev) => {
        //             console.log("THE PREV", prev);
        //             return addMetric(prev, elem.categoryPath, elem.element);
        //         });
        //     }
        // }
        // const realArr = new Array(...sortedElems);
        // console.log("THE ARRAY", realArr);
        // realArr.map((elem) => {
        //     if (elem.type === "category") {
        //         setCategories((prev) => {
        //             return addCategory(prev, elem.categoryPath, elem.element);
        //         });
        //     } else {
        //         setCategories((prev) => {
        //             return addMetric(prev, elem.categoryPath, elem.element);
        //         });
        //     }
        // });
    }, [flag]);
    React.useEffect(() => {
        console.log("EXPERIMENT");
        //! this works
        // let obj1 = {
        //     name: "mpas",
        //     type: "category",
        //     categories: [],
        //     categoryPath: [],
        // };
        // let obj2 = {
        //     name: "giannhs",
        //     type: "category",
        //     metrics: [],
        //     categoryPath: ["mpas"],
        // };

        // let obj3 = {
        //     name: "tzapis",
        //     type: "category",
        //     metrics: [],
        //     categoryPath: ["mpas"],
        // };
        // let obj4 = {
        //     name: "re aei",
        //     type: "metric",
        //     result: -5,
        //     categoryPath: ["mpas", "tzapis"],
        // };
        // let theArr = [obj1, obj2, obj3, obj4];
        // theArr.map((elem) => {
        //     if (elem.type === "category") {
        //         setCategories((prev) => {
        //             return addCategory(prev, elem.categoryPath, elem);
        //         });
        //     } else {
        //         setCategories((prev) => {
        //             return addMetric(prev, elem.categoryPath, elem);
        //         });
        //     }
        // });

        //! check how more nesting affects program
        const notSorted = [
            {
                type: "metric",
                element: {
                    name: "NSFG",
                    result: -1,
                },
                categoryPath: ["PLASTICITY", "RESEQ"],
            },
            {
                type: "category",
                element: {
                    name: "RESEQ",
                    metrics: [],
                },
                categoryPath: ["PLASTICITY"],
            },
            {
                type: "category",
                element: {
                    name: "PLASTICITY",
                    categories: [],
                },
                categoryPath: [],
            },
            {
                type: "category",
                element: {
                    name: "PAR",
                    metrics: [],
                },
                categoryPath: ["PLASTICITY"],
            },
        ];

        const sortedElems = notSorted.sort((a, b) => {
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
        });

        //?for some reason from the first state set it gets the results in the console
        //? has to do with batching
        // const final = sortedElems.reduce((total, current) => {
        //     if (current.type === "metric")
        //         return addMetric(total, current.categoryPath, current.element);
        //     if (current.type === "category")
        //         return addCategory(
        //             total,
        //             current.categoryPath,
        //             current.element
        //         );
        // }, categories);
        // console.log(final, "FINALE");
        for (let elem of sortedElems) {
            if (elem.type === "category") {
                setCategories((prev) => {
                    return addCategory(prev, elem.categoryPath, elem.element);
                });
            } else {
                setCategories((prev) => {
                    return addMetric(prev, elem.categoryPath, elem.element);
                });
            }
        }
        // setCategories((prev) => {
        //     return addCategory(
        //         prev,
        //         sortedElems[0].categoryPath,
        //         sortedElems[0].element
        //     );
        // });

        // sortedElems.map((elem) => {
        //     if (elem.type === "category") {
        //         setCategories((prev) => {
        //             return addCategory(prev, elem.categoryPath, elem.element);
        //         });
        //     } else {
        //         setCategories((prev) => {
        //             return addMetric(prev, elem.categoryPath, elem.element);
        //         });
        //     }
        // });
        // console.log(categories, "EXPERIMENT END");
    }, []);

    // React.useEffect(() => {
    //     console.log("checked effect");
    //     // const sortedElems = getSortedCheckedElems();
    //     // sortedElems.map((elem) => {
    //     //     if (elem.type === "category") {
    //     //         setCategories((prev) => {
    //     //             return addCategory(prev, elem.categoryPath, elem.element);
    //     //         });
    //     //     } else {
    //     //         setCategories((prev) => {
    //     //             return addMetric(prev, elem.categoryPath, elem.element);
    //     //         });
    //     //     }
    //     // });
    //     if (checkedElems.length === 0) return;
    //     const lastAdded = checkedElems[checkedElems.length - 1];
    //     console.log("the last one", lastAdded);
    //     if (lastAdded.type === "category") {
    //         setCategories((prev) => {
    //             return addCategory(
    //                 prev,
    //                 lastAdded.categoryPath,
    //                 lastAdded.element
    //             );
    //         });
    //     } else {
    //         setCategories((prev) => {
    //             return addMetric(
    //                 prev,
    //                 lastAdded.categoryPath,
    //                 lastAdded.element
    //             );
    //         });
    //     }
    // }, [checkedElems]);

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

    function getSortedCheckedElems() {
        const elemsToSort = new Array(...checkedElems);
        const sortedCheckedElems = elemsToSort.sort((a, b) => {
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
        });
        return sortedCheckedElems;
    }

    function addBackRemovedCheckedElements() {
        //! i have to first add the categories by shortest path
        //! and then the metrics so i dont have errors
        //uncheckCheckboxesInWidget();
        //mb we need to empty the categories obj first
        const elemsToSort = new Array(...checkedElems);
        const sortedElems = elemsToSort.sort((a, b) => {
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
        });
        // const endProduct = addElemsInCategories(sortedElems, []);
        // setCategories((prev) => addElemsInCategories(sortedElems, prev));

        sortedElems.map((elem) => {
            console.log("elem passing in state", elem);
            if (elem.type === "category") {
                setCategories((prev) =>
                    addCategory(prev, elem.categoryPath, elem.element)
                );
            } else {
                setCategories((prev) =>
                    addMetric(prev, elem.categoryPath, elem.element)
                );
            }
        });
        // sortedElems.reduce((acc, curr) => {
        //     if (curr.type === "category")
        //         return addCategory(acc, curr.categoryPath, curr.element);
        //     return acc;
        // }, categories);
        // for (let elem of sortedCheckedElems) {
        //     if (elem.type === "category") {
        //         setCategories((prev) => {
        //             return addCategory(prev, elem.categoryPath, elem.element);
        //         });
        //     } else {
        //         setCategories((prev) => {
        //             return addMetric(prev, elem.categoryPath, elem.element);
        //         });
        //     }
        // }

        setCheckedElems([]);
        return;
    }

    function setCategoriesWithSortedArray(sortedElems) {
        sortedElems.map((elem, index) => {
            if (elem.type === "category") {
                setCategories((previous) => {
                    return addCategory(
                        previous,
                        elem.categoryPath,
                        elem.element
                    );
                });
                // prev = [...addCategory(prev, elem.categoryPath, elem.element)];
            } else {
                setCategories((previous) => {
                    return [
                        ...addMetric(previous, elem.categoryPath, elem.element),
                    ];
                });
                //prev = [...addMetric(prev, elem.categoryPath, elem.element)];
            }
        });
        // setCategories((previous) => [...prev]);
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
                    onClick={() => {
                        addBackRemovedCheckedElements();
                        //setFlag((prev) => !prev);
                    }}
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
            <span className="addremoved-element-path">
                {element.categoryPath.map((categName) => {
                    return <>{categName}/</>;
                })}
            </span>
        </div>
    );
}
