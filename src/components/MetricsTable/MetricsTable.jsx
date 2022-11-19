import React from "camunda-modeler-plugin-helpers/react";
import { CategoriesHookContext } from "../../contexts/CategoriesContext.jsx";
import CategoryTree from "./CategoryTree.jsx";

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

//for categoriescontainer and metricscontainer
function RemoveElementBtn({ onClickFn }) {
    return (
        <button className="metrics-wrapper-title-remove" onClick={onClickFn}>
            X
        </button>
    );
}

export default MetricsTable;
