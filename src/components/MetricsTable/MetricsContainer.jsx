import React from "camunda-modeler-plugin-helpers/react";
import { removeCategory } from "../../assets/categories";
import { CategoriesHookContext } from "../../contexts/CategoriesContext";
import MetricLabel from "../../deprecated/MetricLabel.jsx";

export default function MetricsContainer({ category, breadth, pathInTree }) {
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
