import React from "camunda-modeler-plugin-helpers/react";
import { removeMetric } from "../assets/categories";
import evaluateMetricWithClass from "../utils/evaluateMetricsClass";
import { CategoriesHookContext } from "../contexts/CategoriesContext";

export default function MetricLabel({ metric, pathInTree }) {
    const evaluateIn = pathInTree[pathInTree.length - 1];
    console.log("evaluate in", evaluateIn);
    //let evaluation = evaluateMetric(metric.name, evaluateIn, metric.result);
    // let evaluation = evaluateMetricWithClass(
    //     metric.result,
    //     metric.name,
    //     evaluateIn
    // );
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
            {/* <span className="metric-element-evaluation">{evaluation}</span> */}
        </div>
    );
}

// <MetricLabel metric={metric} pathInTree={pathInTree} />
