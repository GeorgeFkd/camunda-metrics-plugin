import React from "camunda-modeler-plugin-helpers/react";
import CategoriesContainer from "./CategoriesContainer";
import MetricsContainer from "../components/MetricsTable/MetricsContainer";

// here there will be a warning
//?explain the pathInTree thing
//kathe kathgoria prosthetei ena onoma sto olo path to opoio paramenei
//kai gia tous epomenous(gi auto pathInTree.push)
//enw kathe MetricWrapper ousiastika de tha emfanistei kapou allou
//opote dhmiourgei apla ena kainourio copy poy prosthetei ton eauto
//tou [...pathInTree,category.name]
//tha mou xreiastei gia otan prospathisw na afairesw kai na prosthesw metrikes
export default function CategoryTree({ category, breadth, pathInTree }) {
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
            />
        );
    }
    return ToRender;
}

/* { {categoriesState.map((cat) => {
                    return (
                        <CategoryTree
                            category={cat}
                            depth={0}
                            breadth={categoriesState.length}
                            pathInTree={[]}
                        />
                    );
                })} 

*/
