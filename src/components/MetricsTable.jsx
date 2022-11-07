import React from "camunda-modeler-plugin-helpers/react";
import {
    numberOfEndEvents,
    numberOfEvents,
    numberOfStartEvents,
} from "../utils/metrics";
import { addMetric } from "../assets/categories";
import { CategoriesHookContext } from "../contexts/CategoriesContext.jsx";

function MetricsTable({}) {
    //TODO auto me tis cathgories pou mou eipane
    //epishs oi metrikes katatassontai kai se kathgories loipon
    const [
        categoriesState,
        removeTheMetric,
        removeTheCategory,
        addCategory,
        removedElements,
    ] = React.useContext(CategoriesHookContext);
    //i have to prepare my data
    //? explaining adding and removing Metrics/Categories
    //* to add/remove a metric we need the whole path to the metric
    //* to add/remove a category we need the path to the category above
    //* the category we want to remove(thats why for categories we dont need to add in path)
    React.useEffect(() => {
        console.log("currently removed ", removedElements);
    }, [removedElements]);
    React.useEffect(() => {
        // addMetric(["modifiability", "correctness"], {
        //     name: "PAPAPAPPAPAP",
        //     result: 5,
        // });
        // addMetric(["modifiability", "efficiency"], {
        //     name: "PAPAPAPPAPAP",
        //     result: 5,
        // });
        //what works(add and remove metrics do + addCategory + removeCategory)
        //addCategory(["modifiability"],{ name: "effectiveness", metrics: [] });
        //removeTheCategory([], "extensibility");

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
                            removeMetricsFn={removeTheMetric}
                            removeCategoryFn={removeTheCategory}
                        />
                    );
                })}
            </div>
        </div>
    );
}
// here there will be a warning
function MetricLabel({ metric, removeMetric }) {
    return (
        <div className="metric-element">
            <span className="metric-element-name">{metric.name}:</span>
            <span className="metric-element-result">{metric.result}</span>
            <button onClick={() => removeMetric(metric)}>X</button>
        </div>
    );
}

//?explain the pathInTree thing
//kathe kathgoria prosthetei ena onoma sto olo path to opoio paramenei
//kai gia tous epomenous(gi auto pathInTree.push)
//enw kathe MetricWrapper ousiastika de tha emfanistei kapou allou
//opote dhmiourgei apla ena kainourio copy poy prosthetei ton eauto
//tou [...pathInTree,category.name]

//tha mou xreiastei gia otan prospathisw na afairesw kai na prosthesw metrikes

function CategoryTree({
    category,
    breadth,
    pathInTree,
    removeMetricsFn,
    removeCategoryFn,
}) {
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
                removeCategoryFn={removeCategoryFn}
                removeMetricsFn={removeMetricsFn}
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
                removeCategoryFn={removeCategoryFn}
                removeMetricsFn={removeMetricsFn}
            />
        );
    }
    return ToRender;
}
//TODO ola na katalhgoun sto idio shmeio
function MetricsContainer({
    category,
    breadth,
    pathInTree,
    removeCategoryFn,
    removeMetricsFn,
}) {
    // doesnt show the overflow properly if in subcategory
    //i now have the path for every metric and category
    // console.log(categoryTitle, pathInTree, "le path");
    const actualPath = pathInTree.slice(0, -1);
    const depth = pathInTree.length;
    return (
        <div
            className="metrics-wrapper"
            style={{
                height: `${175 - depth * 16}px`,
                width: `calc(100%/${breadth})`,
            }}
        >
            <div className="metrics-wrapper-title">
                <span className="metrics-wrapper-title-name">
                    {category.name}
                </span>
                <button onClick={() => removeCategoryFn(actualPath, category)}>
                    X
                </button>
            </div>
            {/* this guys height should be set according to depth */}
            {/* will add depth back in when it is needed to do so(also pathintree.length) */}
            <div
                className="metrics-wrapper-children"
                //kai me calc
            >
                {category.metrics.map((metric) => (
                    <MetricLabel
                        metric={metric}
                        removeMetric={() => removeMetricsFn(pathInTree, metric)}
                    />
                ))}
            </div>
        </div>
    );
}

//? THELW NA VALW STO KENTRO THN KATHGORIA
function CategoriesContainer({
    category,
    isColumn,
    breadth,
    pathInTree,
    removeCategoryFn,
    removeMetricsFn,
}) {
    const actualPath = pathInTree.slice(0, -1);

    return (
        <div
            className="categories-wrapper"
            style={{ width: `calc(100%/${breadth}` }}
        >
            <div className="categories-wrapper-title">
                <span className="categories-wrapper-title-name">
                    {category.name}
                </span>
                <button onClick={() => removeCategoryFn(actualPath, category)}>
                    X
                </button>
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
                        removeMetricsFn={removeMetricsFn}
                        removeCategoryFn={removeCategoryFn}
                    />
                ))}
            </div>
        </div>
    );
}

export default MetricsTable;
