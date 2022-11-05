//THIS WILL BREAK IF A CATEGORY HAS METRICS
//THAT BELONG IN A SUBCATEGORY
//AND THE CATEGORY ITSELF

//another idea hard coding it like
//level1:[cat1,cat2] level2[[cat22,cat33],[]] level3
//so cat1 has cat22 and cat33 but cat2 has no subcategories
const categories = [
    {
        name: "modifiability",
        categories: [
            {
                name: "correctness",
                metrics: [
                    { name: "TNEE", result: 3 },
                    { name: "TNSE", result: 2 },
                ],
            },
            {
                name: "efficiency",
                metrics: [
                    { name: "Mpa", result: 23 },
                    { name: "Mphs1", result: 12 },
                    { name: "Mphs2", result: 12 },
                    { name: "Mphs3", result: 12 },
                    { name: "Mphs4", result: 12 },
                    { name: "Mphs5", result: 12 },
                    { name: "Mphs6", result: 12 },
                ],
            },
        ],
    },
    {
        name: "extensibility",
        metrics: [
            { name: "TNEE", result: 3 },
            { name: "TNSE", result: 2 },
            { name: "NoA", result: 12 },
            { name: "NoA", result: 12 },
            { name: "NoA", result: 12 },
        ],
    },
];

export function removeTheMetric(categArr, metric) {
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
            loop(nextCategory[0].categories, categArr[currentLevel], metric);
        }
    };
    loop(categories, categArr[0], metric);
    console.log(categories, "NEW papi NEW ME ");
}

export function addMetric(categArr, metric) {
    const levels = categArr.length;
    let currentLevel = 0;
    const loop = (categoriesArr, categName, metric) => {
        console.log(categoriesArr, categName, "Array and category name");
        console.log(currentLevel, levels, "depth");
        const nextCategory = categoriesArr.filter(
            (categ) => categ.name === categName
        );
        if (nextCategory.length == 0) {
            throw Error(
                "possibly nested category was not found check argument positions"
            );
        }
        console.log(nextCategory);
        if (currentLevel === levels - 1) {
            //i reached the last element
            nextCategory[0].metrics.push(metric);
            return;
        } else {
            currentLevel += 1;
            loop(nextCategory[0].categories, categArr[currentLevel], metric);
        }
    };
    loop(categories, categArr[0], metric);
    //console.log(categories, "NEW FUNCTION NEW ME ");
}

export default categories;
