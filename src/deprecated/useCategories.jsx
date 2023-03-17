import React from "camunda-modeler-plugin-helpers/react";
import initialcategories from "./categories";
export default function useCategories(calculatedMetrics) {
    //const [categories, setCategories] = React.useState(initialcategories);
    //const [removed, setRemoved] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    //!this might be causing problems
    const [removed, setRemoved] = React.useState(
        convertInitialCategoriesToRemoved(initialcategories)
    );

    // React.useEffect(() => {
    //     //! needed to get the proper metrics immediately
    //     console.log("we convertin");
    //     // setCategories((prev) => {
    //     //     return Array.from(categories);
    //     // });
    //     setRemoved((prev) => {
    //         return setAllMetricsInRemovedToTheirCalculatedResult(
    //             prev,
    //             calculatedMetrics
    //         );
    //     });
    // }, []);
    // React.useEffect(() => {
    //     console.log("IN CATEGORIES HOOK");
    //     if (categories.length > 0) {
    //         setCategories((prev) => {
    //             return setAllMetricsToTheirCalculatedResult(
    //                 prev,
    //                 calculatedMetrics
    //             );
    //         });
    //     }
    //     if (removed.length > 0) {
    //     }
    // }, [calculatedMetrics]);

    function setAllMetricsInRemovedToTheirCalculatedResult(
        categoriesRemovedObjArr,
        calculatedMetricsMap
    ) {
        console.log("we settin");
        const result = categoriesRemovedObjArr.map((current) => {
            if (current.type === "category") return current;
            current.element.result = calculatedMetricsMap.get(
                current.element.name
            );
            return current;
        });
        console.log(result);
        return result;
    }

    function convertInitialCategoriesToRemoved(categoriesObjArr) {
        const result = [];
        function iterateCategories(current, categPath) {
            console.log("CURRENT:", current, "CATEG");
            let objectsWithMetrics = current.filter((elem) =>
                elem.hasOwnProperty("metrics")
            );
            let objectsWithSubcategories = current.filter((elem) =>
                elem.hasOwnProperty("categories")
            );
            console.log(objectsWithMetrics, "we metricing");
            if (objectsWithMetrics.length === 0)
                console.log("No Categories with metrics in this level");
            for (let currentCateg of objectsWithMetrics) {
                result.push({
                    type: "category",
                    element: currentCateg,
                    categoryPath: categPath,
                });

                currentCateg.metrics.map((metric) => {
                    result.push({
                        type: "metric",
                        element: metric,
                        categoryPath: [...categPath, currentCateg.name],
                    });
                });
                currentCateg.metrics = [];
            }
            for (let currentCateg of objectsWithSubcategories) {
                result.push({
                    type: "category",
                    element: currentCateg,
                    categoryPath: categPath,
                });
            }

            if (objectsWithSubcategories.length > 0) {
                objectsWithSubcategories.map((objWithCategs) => {
                    iterateCategories(objWithCategs.categories, [
                        ...categPath,
                        objWithCategs.name,
                    ]);
                    objWithCategs.categories = [];
                });
            }
        }
        iterateCategories(categoriesObjArr, []);
        console.log("converted", result);
        return result;
    }

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
        console.log("THE DISPLAYED CATEGORIES STATE IS", categories);
    }, [categories]);

    return [categories, setCategories, removed, setRemoved];
}
