import React from "camunda-modeler-plugin-helpers/react";
import initialcategories from "../assets/categories";
export default function useCategories(calculatedMetrics) {
    const [categories, setCategories] = React.useState(initialcategories);

    React.useEffect(() => {
        console.log("IN CATEGORIES HOOK");
        // here i gotta set some state
        calculateTheMetrics(calculatedMetrics);
    }, [calculatedMetrics]);
    // console.log("categories hook", categories);
    //this will both have removed metrics and categories
    const [removed, setRemoved] = React.useState([]);
    //removeMetric(["modifiability", "correctness"], { name: "TNSE", result: 2 });

    function calculateTheMetrics(calculatedMetricsMap) {
        if (!calculatedMetrics) {
            throw Error("No metrics for me ubu");
        }
        //for each level i loop the current categories
        //for those that have metrics i replace the objects
        //for those that don't i go in the categories property and continue the same logic
        const previousState = categories;
        function iterateCategories(current) {
            let objectsWithMetrics = current.filter((elem) =>
                elem.hasOwnProperty("metrics")
            );
            let objectsWithSubcategories = current.filter((elem) =>
                elem.hasOwnProperty("categories")
            );
            console.log(objectsWithMetrics, "we metricing");
            if (objectsWithMetrics.length === 0)
                throw Error("Something babababa");
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
        setCategories(previousState);
    }
    function removeCategory(categoryPath, category) {
        //i could only use the categoryArr and get the last element as the category name
        //we always need a new reference for the state we cant do it in place
        console.info(
            "Removing category: ",
            category.name,
            "in path: ",
            categoryPath
        );
        const previousState = Object.create(categories);
        const levelsNeeded = categoryPath.length;
        let current = previousState;
        let currentLevel = 0;
        if (categoryPath.length === 0) {
            setCategories((categs) => {
                return categs.filter((cat) => cat.name !== category.name);
            });
            setRemoved((prev) => {
                return [
                    ...prev,
                    { element: category, categoryPath, type: "category" },
                ];
            });
            //?these could be used for the widget removal
            return;
        }
        while (true) {
            //to remove a subcategory i need to be at the category above it and filter
            //the categories property

            current = current.filter((cat) => {
                return cat.name === categoryPath[currentLevel];
            });
            if (currentLevel === levelsNeeded - 1) {
                console.log("reached ok level", current[0].categories);
                current[0].categories = current[0].categories.filter(
                    (cat) => cat.name !== category.name
                );
                console.log("mutated current->", current);
                break;
            }

            console.log("RN and filtered", current);
            if (current.length === 0)
                throw Error("Category path does not exist ");
            if (!current[0].categories) {
                //mb nothing went wrong and the current category just doesnt have metrics
                //for now i assum sth went wrong
                throw Error("Something went wrong");
            }
            current = current[0].categories;
            currentLevel++;
        }
        console.log("AFTER REMOVING CATEGORY SETTING STATE TO");
        console.log(previousState);
        setCategories((prev) => previousState);
        setRemoved((prev) => {
            return [
                ...prev,
                { element: category, categoryPath, type: "category" },
            ];
        });
    }

    //* used in the addremove-widget to bring back categories
    function addCategory(categoryPath, category) {
        //need new object to update state
        if (!categoryPath) throw Error("Path for category was not supplied");
        console.info("Adding category ", category, "in path", categoryPath);

        const previousState = Object.create(categories);
        console.info("State currently is", previousState);
        let current = previousState;
        let currentLvl = 0;
        while (true) {
            //get category from path

            if (currentLvl === categoryPath.length) {
                //means we reached our destination
                //console.log(current);
                //remove category from categories
                current.push(category);
                setRemoved((prev) => {
                    return prev.filter(
                        (elem) => elem.element.name !== category.name
                    );
                });
                console.log(current, "we made it");
                break;
            }
            current = current.filter((cat) => {
                return cat.name === categoryPath[currentLvl];
            });
            console.log("RN: filtered", current);
            if (current.length === 0)
                throw Error("Category path does not exist ");
            if (!current[0].categories) {
                throw Error("Something went wrong");
            }
            current = current[0].categories;
            currentLvl++;
        }

        setCategories((prev) => previousState);
    }
    //! someday rewrite it without recursion
    function removeTheMetric(categArr, metric) {
        const previousState = Object.create(categories);
        const levels = categArr.length;
        let currentLevel = 0;
        const loop = (categoriesArr, categName, metric) => {
            const nextCategory = categoriesArr.filter(
                (categ) => categ.name === categName
            );
            if (nextCategory.length == 0) {
                throw Error(
                    "possibly nested category was not found check argument positions"
                );
            }

            if (currentLevel === levels - 1) {
                //i reached the last element
                console.log(nextCategory[0].metrics);
                //i remove the metric here
                nextCategory[0].metrics = nextCategory[0].metrics.filter(
                    (m) => m.name !== metric.name
                );
                setRemoved((prev) => [
                    ...prev,
                    { element: metric, categoryPath: categArr, type: "metric" },
                ]);
                return;
            } else {
                currentLevel += 1;
                loop(
                    nextCategory[0].categories,
                    categArr[currentLevel],
                    metric
                );
            }
        };

        loop(previousState, categArr[0], metric);
        // console.log("STATE AFTER: ", previousState);

        setCategories((prev) => previousState);
        //console.log("STATE AFTER UPDATE", categories);
    }

    function addMetric(categArr, metric) {
        const previousState = Object.create(categories);
        const levels = categArr.length;
        let currentLevel = 0;
        const loop = (categoriesArr, categName, metric) => {
            const nextCategory = categoriesArr.filter(
                (categ) => categ.name === categName
            );
            if (nextCategory.length == 0) {
                throw Error(
                    "possibly nested category was not found check argument positions"
                );
            }

            if (currentLevel === levels - 1) {
                //i reached the last element
                console.log(nextCategory[0].metrics);
                //i add the metric here
                nextCategory[0].metrics.push(metric);
                setRemoved((prev) => {
                    return prev.filter(
                        (elems) => elems.element.name !== metric.name
                    );
                });
                return;
            } else {
                currentLevel += 1;
                loop(
                    nextCategory[0].categories,
                    categArr[currentLevel],
                    metric
                );
            }
        };

        loop(previousState, categArr[0], metric);
        // console.log("STATE AFTER: ", previousState);

        setCategories(previousState);
    }

    React.useEffect(() => {
        console.log("you guys state is updated", categories);
    }, [categories]);

    return [
        categories,
        removeTheMetric,
        removeCategory,
        addCategory,
        removed,
        addMetric,
    ];
}
