import React from "camunda-modeler-plugin-helpers/react";
import initialcategories from "../assets/categories";
export default function useCategories(calculatedMetrics) {
    const [categories, setCategories] = React.useState(initialcategories);
    const [removed, setRemoved] = React.useState([]);
    React.useEffect(() => {
        //! needed to get the proper metrics immediately
        setCategories((prev) => {
            return Array.from(categories);
        });
    }, []);
    React.useEffect(() => {
        console.log("IN CATEGORIES HOOK");
        setCategories((prev) => {
            return setAllMetricsToTheirCalculatedResult(
                prev,
                calculatedMetrics
            );
        });
    }, [calculatedMetrics]);

    function setAllMetricsToTheirCalculatedResult(
        categoriesObject,
        calculatedMetricsMap
    ) {
        if (!calculatedMetrics) {
            throw Error("No calculated metrics were supplied");
        }
        //for each level i loop the current categories
        //for those that have metrics i replace the objects
        //for those that don't i go in the categories property and continue the same logic
        const previousState = categoriesObject;
        function iterateCategories(current) {
            let objectsWithMetrics = current.filter((elem) =>
                elem.hasOwnProperty("metrics")
            );
            let objectsWithSubcategories = current.filter((elem) =>
                elem.hasOwnProperty("categories")
            );
            console.log(objectsWithMetrics, "we metricing");
            if (objectsWithMetrics.length === 0)
                throw Error("EMPTY METRICS ARRAY");
            for (let currentCateg of objectsWithMetrics) {
                currentCateg.metrics = currentCateg.metrics.map((metric) => {
                    metric.result = calculatedMetricsMap.get(metric.name);
                    return metric;
                });
            }
            if (objectsWithSubcategories.length > 0) {
                objectsWithSubcategories.map((objWithCategs) => {
                    iterateCategories(objWithCategs.categories);
                });
            }
        }
        iterateCategories(previousState);
        return previousState;
    }

    React.useEffect(() => {
        console.log("you guys state is updated", categories);
    }, [categories]);

    return [categories, setCategories, removed, setRemoved];
}
