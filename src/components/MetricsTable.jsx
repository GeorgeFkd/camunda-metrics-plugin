import React from "camunda-modeler-plugin-helpers/react";
import { removeCategory, removeMetric } from "../assets/categories";
import evaluateMetricWithClass from "../utils/evaluateMetricsClass";
import { CategoriesHookContext } from "../contexts/CategoriesContext.jsx";
import evaluateMetric from "../utils/evaluateMetrics";

function MetricsTable({}) {
    //TODO auto me tis cathgories pou mou eipane
    //epishs oi metrikes katatassontai kai se kathgories loipon
    const [categoriesState] = React.useContext(CategoriesHookContext);
    //i have to prepare my data
    //? explaining adding and removing Metrics/Categories
    //* to add/remove a metric we need the whole path to the metric
    //* to add/remove a category we need the path to the category above
    //* the category we want to remove(thats why for categories we dont need to add in path)
    React.useEffect(() => {
        console.log("CATEGORY STATE IN METRICS TABLE UPDATED", categoriesState);
    }, [categoriesState]);

    return (
        <div className="metrics-container">
            <div className="metrics-table-title">BPMN Metrics</div>
            <div className="metrics-table">
                {categoriesState.map((cat) => {
                    return (
                        <CategoryTree
                            category={cat}
                            depth={0}
                            breadth={categoriesState.length}
                            pathInTree={[]}
                        />
                    );
                })}
            </div>
        </div>
    );
}
// here there will be a warning

//?explain the pathInTree thing
//kathe kathgoria prosthetei ena onoma sto olo path to opoio paramenei
//kai gia tous epomenous(gi auto pathInTree.push)
//enw kathe MetricWrapper ousiastika de tha emfanistei kapou allou
//opote dhmiourgei apla ena kainourio copy poy prosthetei ton eauto
//tou [...pathInTree,category.name]

//tha mou xreiastei gia otan prospathisw na afairesw kai na prosthesw metrikes

function CategoryTree({ category, breadth, pathInTree }) {
    const keys = Object.keys(category);

    let ToRender;
    //this condition determines whether the last in the recursion or not
    const isCategoryWithMetrics = keys.includes("metrics");
    if (isCategoryWithMetrics) {
        const pathForMetric = [...pathInTree, category.name];
        console.log(pathForMetric, "for metrics");
        ToRender = (
            <MetricsContainer
                category={category}
                breadth={breadth}
                pathInTree={pathForMetric}
            />
        );
    } else if (keys.includes("categories")) {
        //koitazw an to epomeno level categories exei categories h metrics
        //an exei metrikes shmainei oti tha prepei na ta valw sthn seira
        //an exei kathgories prepei na ta valw se sthlh
        let subCategoryKeys = Object.keys(category.categories);
        //does this category's subcategories have subcategories
        let isColumn = subCategoryKeys.includes("categories");
        pathInTree.push(category.name);
        ToRender = (
            <CategoriesContainer
                category={category}
                flexDirection={isColumn}
                breadth={breadth}
                pathInTree={pathInTree}
            />
        );
    }
    return ToRender;
}

function RemoveElementBtn({ onClickFn }) {
    return (
        <button className="metrics-wrapper-title-remove" onClick={onClickFn}>
            X
        </button>
    );
}

function MetricsContainer({ category, breadth, pathInTree }) {
    const actualPath = pathInTree.slice(0, -1);
    const depth = pathInTree.length;
    const [, setCategoriesState, , setRemoved] = React.useContext(
        CategoriesHookContext
    );
    console.log("path in tree", pathInTree);

    function addCategoryToRemovedElements() {
        setRemoved((prev) => {
            console.log(prev, "is previous removed");
            return [
                ...prev,
                {
                    element: category,
                    categoryPath: pathInTree,
                    type: "category",
                },
            ];
        });
        setCategoriesState((prev) => {
            return removeCategory(prev, actualPath, category);
        });
    }

    return (
        <div
            className="metrics-wrapper"
            style={{
                height: `${200 - depth * 16}px`,
                width: `calc(100%/${breadth})`,
            }}
        >
            <div className="metrics-wrapper-title">
                <span className="metrics-wrapper-title-name">
                    {category.name}
                </span>
                <span className="metrics-wrapper-title-remove">
                    {/* <RemoveElementBtn
                        onClickFn={addCategoryToRemovedElements}
                    /> */}
                </span>
            </div>
            <div className="metrics-wrapper-children">
                {category.metrics.map((metric) => (
                    <MetricLabel metric={metric} pathInTree={pathInTree} />
                ))}
            </div>
        </div>
    );
}

function MetricLabel({ metric, pathInTree }) {
    const evaluateIn = pathInTree[pathInTree.length - 1];
    console.log("evaluate in", evaluateIn);
    //let evaluation = evaluateMetric(metric.name, evaluateIn, metric.result);
    let evaluation = evaluateMetricWithClass(
        metric.result,
        metric.name,
        evaluateIn
    );
    const [, setCategoriesState, , setRemoved] = React.useContext(
        CategoriesHookContext
    );

    function addMetricToRemovedElementsFromDisplayedMetrics() {
        setRemoved((prev) => {
            return [
                ...prev,
                {
                    element: metric,
                    categoryPath: pathInTree,
                    type: "metric",
                },
            ];
        });
        setCategoriesState((prev) => removeMetric(prev, pathInTree, metric));
    }

    return (
        <div className="metric-element">
            <span className="metric-element-name">{metric.name}:</span>
            <span className="metric-element-result">{metric.result}</span>
            {/* <RemoveElementBtn
                onClickFn={addMetricToRemovedElementsFromDisplayedMetrics}
            /> */}
            <span className="metric-element-evaluation">{evaluation}</span>
        </div>
    );
}

//? THELW NA VALW STO KENTRO THN KATHGORIA
function CategoriesContainer({ category, isColumn, breadth, pathInTree }) {
    const actualPath = pathInTree.slice(0, -1);
    const [, setCategoriesState, , setRemoved] = React.useContext(
        CategoriesHookContext
    );

    function addCategoryToRemovedElementsFromDisplayed() {
        setRemoved((prev) => {
            console.log(prev, "is previous removed");
            return [
                ...prev,
                {
                    element: category,
                    categoryPath: actualPath,
                    type: "category",
                },
            ];
        });

        setCategoriesState((prev) => {
            return removeCategory(prev, actualPath, category);
        });
    }

    return (
        <div
            className="categories-wrapper"
            //this means it has subcategories and could use some more width
            style={{ width: `calc(100%/${breadth} + 100px)` }}
        >
            <div className="categories-wrapper-title">
                <span className="categories-wrapper-title-name">
                    {category.name}
                </span>
                {/* <RemoveElementBtn
                    onClickFn={addCategoryToRemovedElementsFromDisplayed}
                /> */}
            </div>

            <div
                className="categories-wrapper-children"
                style={{
                    flexDirection: isColumn ? "column" : "row",
                }}
            >
                {category.categories.map((cat) => (
                    <CategoryTree
                        category={cat}
                        breadth={category.categories.length}
                        pathInTree={pathInTree}
                    />
                ))}
            </div>
        </div>
    );
}

export default MetricsTable;
