import React from "camunda-modeler-plugin-helpers/react";
import {
    numberOfEndEvents,
    numberOfEvents,
    numberOfStartEvents,
} from "../utils/metrics";
import categories, { addMetric } from "../assets/categories";
import useCategories from "../hooks/useCategories.jsx";
function MetricsTable({
    data,
    metrics,
    setMetrics,
    setRemovedMetrics,
    removeMetric,
}) {
    //TODO auto me tis cathgories pou mou eipane
    //epishs oi metrikes katatassontai kai se kathgories loipon
    const [
        categoriesState,
        setCategories,
        removeTheMetric,
        removeTheCategory,
        addCategory,
    ] = useCategories();
    //i have to prepare my data
    //? explaining adding and removing Metrics/Categories
    //* to add/remove a metric we need the whole path to the metric
    //* to add/remove a category we need the path to the category above
    //* the category we want to remove(thats why for categories we dont need to add in path)
    React.useEffect(() => {
        // addMetric(["modifiability", "correctness"], "Mpartsoump");
        addMetric(["modifiability", "efficiency"], {
            name: "PAPAPAPPAPAP",
            result: 5,
        });
        //what works(add and remove metrics do + addCategory + removeCategory)
        addCategory({ name: "effectiveness", metrics: [] }, ["modifiability"]);
        //removeTheCategory(["modifiability"], "efficiency");
        //removeTheCategory([], "extensibility");

        console.log("categories", categoriesState);
    }, []);

    return (
        <div className="metrics-container">
            <div className="metrics-table-title">BPMN Metrics</div>
            <div className="metrics-table">
                {categoriesState.map((cat) => {
                    return (
                        <CategoryTree
                            category={cat}
                            depth={0}
                            breadth={categories.length}
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
    depth,
    breadth,
    pathInTree,
    removeMetricsFn,
    removeCategoryFn,
}) {
    const keys = Object.keys(category);

    let ToRender;
    const isCategoryWithMetrics = keys.includes("metrics");
    if (isCategoryWithMetrics) {
        const pathForMetric = [...pathInTree, category.name];
        console.log(pathForMetric, "for metrics");
        ToRender = (
            <MetricsWrapper
                categoryTitle={category.name}
                depth={depth}
                breadth={breadth}
                pathInTree={pathForMetric}
                removeCategoryFn={removeCategoryFn}
            >
                {category.metrics.map((metric) => (
                    <MetricLabel
                        metric={metric}
                        removeMetric={() =>
                            removeMetricsFn(pathForMetric, metric)
                        }
                    />
                ))}
            </MetricsWrapper>
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
            <CategoriesWrapper
                categoryTitle={category.name}
                flexDirection={isColumn}
                breadth={breadth}
                pathInTree={pathInTree}
                removeCategoryFn={removeCategoryFn}
            >
                {category.categories.map((cat) => (
                    <CategoryTree
                        category={cat}
                        depth={depth + 1}
                        breadth={category.categories.length}
                        pathInTree={pathInTree}
                        removeMetricsFn={removeMetricsFn}
                        removeCategoryFn={removeCategoryFn}
                    />
                ))}
            </CategoriesWrapper>
        );
    }
    return ToRender;
}
//TODO ola na katalhgoun sto idio shmeio
function MetricsWrapper({
    children,
    categoryTitle,
    depth,
    breadth,
    pathInTree,
    removeCategoryFn,
}) {
    //i now have the path for every metric and category
    // console.log(categoryTitle, pathInTree, "le path");
    const actualPath = pathInTree.slice(0, -1);
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
                    {categoryTitle}
                </span>
                <button
                    onClick={
                        () => removeCategoryFn(actualPath, categoryTitle)
                        // console.log(
                        //     "Args for remove category:",
                        //     actualPath,
                        //     categoryTitle
                        // )
                    }
                >
                    X
                </button>
            </div>
            {/* this guys height should be set according to depth */}
            <div
                className="metrics-wrapper-children"
                //kai me calc
            >
                {children}
            </div>
        </div>
    );
}

//? THELW NA VALW STO KENTRO THN KATHGORIA
function CategoriesWrapper({
    children,
    categoryTitle,
    isColumn,
    breadth,
    pathInTree,
    removeCategoryFn,
}) {
    const actualPath = pathInTree.slice(0, -1);

    return (
        <div
            className="categories-wrapper"
            style={{ width: `calc(100%/${breadth}` }}
        >
            <div className="categories-wrapper-title">
                <span className="categories-wrapper-title-name">
                    {categoryTitle}
                </span>
                <button
                    onClick={() => removeCategoryFn(actualPath, categoryTitle)}
                >
                    X
                </button>
            </div>

            <div
                className="categories-wrapper-children"
                style={{
                    flexDirection: isColumn ? "column" : "row",
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default MetricsTable;
