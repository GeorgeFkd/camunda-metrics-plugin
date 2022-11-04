import React from "camunda-modeler-plugin-helpers/react";
import initialcategories from "../assets/categories";
export default function useCategories() {
    const [categories, setCategories] = React.useState(initialcategories);
    // console.log("categories hook", categories);
    //removeMetric(["modifiability", "correctness"], { name: "TNSE", result: 2 });
    function removeCategory(categoryArr, categoryName) {
        //i could only use the categoryArr and get the last element as the category name
        //we always need a new reference for the state we cant do it in place
        const previousState = Object.create(categories);
        const levels = categoryArr.length;
        let currentLevel = 0;
        const loop = (allCategories, categName) => {
            const nextCategory = allCategories.filter(
                (categ) => categ.name === categName
            );
            console.log("NEXT: ", nextCategory);
            // if (nextCategory.length == 0) {
            //     //not in this level we gotta go deeper
            //     // allCategories.forEach((cat) => {
            //     //     cat.categories && loop(cat.categories, categName);
            //     // });
            //     // const subCategories = allCategories.filter(
            //     //     (categ) => categ.categories
            //     // );
            //     // console.log(subCategories);
            //     // for (let i = 0; i < subCategories.length; i++) {
            //     //     loop(subCategories[i].categories, categName);
            //     // }

            // } else {
            //     //means we found it so remove it
            //     console.log("We found it in this lvl");
            //     allCategories = allCategories.filter(
            //         (categ) => categ.name !== categName
            //     );
            //     console.log(allCategories);
            //     return;
            // }
        };

        loop(previousState, categoryName);
        console.log(previousState, "removed category");
        setCategories(previousState);
    }

    function addCategory() {}
    function removeTheMetric(categArr, metric) {
        const previousState = Object.create(categories);
        const levels = categArr.length;
        let currentLevel = 0;
        const loop = (categoriesArr, categName, metric) => {
            //console.log(categoriesArr, categName, "Array and category name");
            //console.log(currentLevel, levels, "depth");
            const nextCategory = categoriesArr.filter(
                (categ) => categ.name === categName
            );
            if (nextCategory.length == 0) {
                throw Error(
                    "possibly nested category was not found check argument positions"
                );
            }
            // console.log(nextCategory);
            if (currentLevel === levels - 1) {
                //i reached the last element
                console.log(nextCategory[0].metrics);
                nextCategory[0].metrics = nextCategory[0].metrics.filter(
                    (m) => m.name !== metric.name
                );
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
        //console.log("STATE AFTER UPDATE", categories);
    }
    React.useEffect(() => {
        console.log("you guys state is updated", categories);
    }, [categories]);

    return [categories, setCategories, removeTheMetric, removeCategory];
}
