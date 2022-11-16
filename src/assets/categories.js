import { CATEGORIES } from "./constants";

const categories = [
    {
        name: CATEGORIES.PLASTICITY,
        categories: [
            {
                name: CATEGORIES.RESEQ,
                metrics: [
                    { name: "CLA", result: 3 },
                    { name: "CFC", result: 2 },
                    { name: "NOA", result: 2 },
                    { name: "NSFA", result: 2 },
                ],
            },
            {
                name: CATEGORIES.PAR,
                metrics: [
                    { name: "NOAJS", result: 23 },
                    { name: "TS", result: 12 },
                    { name: "CFC", result: 12 },
                    { name: "NSFA", result: 12 },
                    { name: "NSFG", result: 12 },
                    { name: "CLA", result: 12 },
                    { name: "TNG", result: 12 },
                ],
            },
        ],
    },
    {
        name: CATEGORIES.MODIFIABILITY,
        metrics: [
            { name: "AGD", result: 3 },
            { name: "MGD", result: 2 },
            { name: "GM", result: 12 },
            { name: "GH", result: 12 },
        ],
    },
    {
        name: CATEGORIES.CORRECTNESS,
        metrics: [
            { name: "AGD", result: 3 },
            { name: "MGD", result: 2 },
            { name: "GM", result: 12 },
            { name: "GH", result: 12 },
        ],
    },
];

export function addMetric(categoriesObject, categArr, metric) {
    const previousState = Array.from(categoriesObject);
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
            return;
        } else {
            currentLevel += 1;
            loop(nextCategory[0].categories, categArr[currentLevel], metric);
        }
    };

    loop(previousState, categArr[0], metric);
    return previousState;
}
export function removeMetric(categoriesObject, categArr, metric) {
    const previousState = Array.from(categoriesObject);
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
            return previousState;
        } else {
            currentLevel += 1;
            loop(nextCategory[0].categories, categArr[currentLevel], metric);
        }
    };

    loop(previousState, categArr[0], metric);
    return previousState;
}

export function addCategory(categoriesObject, categoryPath, category) {
    if (!categoryPath) throw Error("Path for category was not supplied");
    console.info("Adding category ", category, "in path", categoryPath);
    //need new object to update state
    const previousState = Array.from(categoriesObject);
    console.info("State currently is", previousState);
    let current = previousState;
    let currentLvl = 0;
    while (true) {
        //get category from path

        if (currentLvl === categoryPath.length) {
            //means we reached our destination
            //add category to categories
            current.push(category);
            console.log(current, "we made it");
            break;
        }
        current = current.filter((cat) => {
            return cat.name === categoryPath[currentLvl];
        });
        console.log("RN: filtered", current);
        if (current.length === 0) throw Error("Category path does not exist ");
        if (!current[0].categories) {
            throw Error("Something went wrong");
        }
        current = current[0].categories;
        currentLvl++;
    }

    return previousState;
}
export function removeCategory(categoriesObject, categoryPath, category) {
    console.info(
        "Removing category: ",
        category.name,
        "in path: ",
        categoryPath
    );
    let previousState = Array.from(categoriesObject);
    const levelsNeeded = categoryPath.length;
    let current = previousState;
    let currentLevel = 0;
    if (categoryPath.length === 0) {
        previousState = previousState.filter(
            (cat) => cat.name !== category.name
        );
    } else {
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
    }
    console.log("AFTER REMOVING CATEGORY SETTING STATE TO");
    console.log(previousState);
    return previousState;
}

function initialiseCategories() {
    let categoriesArrayToConstruct = [];
    categoriesArrayToConstruct = addCategory(categoriesArrayToConstruct, [], {
        name: "PLASTICITY",
        categories: [],
    });
    categoriesArrayToConstruct = addCategory(
        categoriesArrayToConstruct,
        ["PLASTICITY"],
        {
            name: "RESEQ",
            metrics: [],
        }
    );
    categoriesArrayToConstruct = addMetric(
        categoriesArrayToConstruct,
        ["PLASTICITY", "RESEQ"],
        {
            name: "CLA",
            result: -0,
        }
    );
    categoriesArrayToConstruct = addMetric(
        categoriesArrayToConstruct,
        ["PLASTICITY", "RESEQ"],
        {
            name: "CFC",
            result: -0,
        }
    );
    categoriesArrayToConstruct = addMetric(
        categoriesArrayToConstruct,
        ["PLASTICITY", "RESEQ"],
        {
            name: "NOA",
            result: -0,
        }
    );
    categoriesArrayToConstruct = addMetric(
        categoriesArrayToConstruct,
        ["PLASTICITY", "RESEQ"],
        {
            name: "NSFA",
            result: -0,
        }
    );
    categoriesArrayToConstruct = addCategory(
        categoriesArrayToConstruct,
        ["PLASTICITY"],
        { name: "PAR", metrics: [] }
    );
    categoriesArrayToConstruct = addCategory(categoriesArrayToConstruct, [], {
        name: "MODIFIABILITY",
        metrics: [],
    });
    categoriesArrayToConstruct = addCategory(categoriesArrayToConstruct, [], {
        name: "CORRECTNESS",
        metrics: [],
    });
    return categoriesArrayToConstruct;
}

console.log(initialiseCategories(), "ouuuuuus");

export default categories;
