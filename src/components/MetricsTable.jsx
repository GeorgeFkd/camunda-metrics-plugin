import React from "camunda-modeler-plugin-helpers/react";
import {
    numberOfEndEvents,
    numberOfEvents,
    numberOfStartEvents,
} from "../utils/metrics";
import categories, { addMetric } from "../assets/categories";
function MetricsTable({
    data,
    metrics,
    setMetrics,
    setRemovedMetrics,
    removeMetric,
}) {
    //TODO auto me tis cathgories pou mou eipane
    //epishs oi metrikes katatassontai kai se kathgories loipon

    //i have to prepare my data
    React.useEffect(() => {
        //it works
        addMetric(["modifiability", "correctness"], "Mpartsoump");
        addMetric(["modifiability", "efficiency"], "PAPAPAPPAPAP");
    }, []);
    return (
        <div className="metrics-container">
            <div className="metrics-table-title">BPMN Metrics</div>
            <div className="metrics-table">
                {categories.map((cat) => {
                    return (
                        <CategoryTree
                            category={cat}
                            depth={0}
                            breadth={categories.length}
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
function CategoryTree({ category, depth, breadth }) {
    const keys = Object.keys(category);

    console.log("depth is", depth);
    console.log("category is", category.name);
    console.log("keys are", keys);
    console.log("breadth is", breadth);
    if (keys.includes("metrics")) {
        return (
            <MetricsWrapper
                categoryTitle={category.name}
                depth={depth}
                breadth={breadth}
            >
                {category.metrics.map((metric) => (
                    <MetricLabel
                        metric={metric}
                        removeMetric={() => console.log(metric)}
                    />
                ))}
            </MetricsWrapper>
        );
    } else if (keys.includes("categories")) {
        //koitazw an to epomeno level categories exei categories h metrics
        //an exei metrikes shmainei oti tha prepei na ta valw sthn seira
        //an exei kathgories prepei na ta valw se sthlh
        let subCategoryKeys = Object.keys(category.categories);
        let isColumn = subCategoryKeys.includes("categories");

        return (
            <CategoriesWrapper
                categoryTitle={category.name}
                flexDirection={isColumn}
                breadth={breadth}
            >
                {category.categories.map((cat) => (
                    <CategoryTree
                        category={cat}
                        depth={depth + 1}
                        breadth={category.categories.length}
                    />
                ))}
            </CategoriesWrapper>
        );
    }
}
//TODO ola na katalhgoun sto idio shmeio
function MetricsWrapper({ children, categoryTitle, depth, breadth }) {
    return (
        <div
            className="metrics-wrapper"
            style={{
                height: `${175 - depth * 16}px`,
                width: `calc(100%/${breadth})`,
            }}
        >
            <div className="metrics-wrapper-title">{categoryTitle}</div>
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
function CategoriesWrapper({ children, categoryTitle, isColumn, breadth }) {
    return (
        <div
            className="categories-wrapper"
            style={{ width: `calc(100%/${breadth}` }}
        >
            <div className="categories-wrapper-title">{categoryTitle}</div>
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
