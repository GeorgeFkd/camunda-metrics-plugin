import React from "camunda-modeler-plugin-helpers/react";
import { removeCategory } from "../../assets/categories";
import { CategoriesHookContext } from "../../contexts/CategoriesContext.jsx";
import CategoryTree from "./CategoryTree.jsx";

//? THELW NA VALW STO KENTRO THN KATHGORIA
export default function CategoriesContainer({
    category,
    isColumn,
    breadth,
    pathInTree,
}) {
    const actualPath = pathInTree.slice(0, -1);
    const [, setCategoriesState, , setRemoved] = React.useContext(
        CategoriesHookContext
    );

    function addCategoryToRemovedElementsFromDisplayed() {
        setRemoved((prev) => {
            console.log(prev, "is previous removed");
            return [
                ...prev,
                {
                    element: category,
                    categoryPath: actualPath,
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
            className="categories-wrapper"
            //this means it has subcategories and could use some more width
            style={{ width: `calc(100%/${breadth} + 100px)` }}
        >
            <div className="categories-wrapper-title">
                <span className="categories-wrapper-title-name">
                    {category.name}
                </span>
                {/* <RemoveElementBtn
                onClickFn={addCategoryToRemovedElementsFromDisplayed}
            /> */}
            </div>

            <div
                className="categories-wrapper-children"
                style={{
                    flexDirection: isColumn ? "column" : "row",
                }}
            >
                {category.categories.map((cat) => (
                    <CategoryTree
                        category={cat}
                        breadth={category.categories.length}
                        pathInTree={pathInTree}
                    />
                ))}
            </div>
        </div>
    );
}
