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
                    { name: "Mphs", result: 12 },
                    { name: "Mphs", result: 12 },
                    { name: "Mphs", result: 12 },
                    { name: "Mphs", result: 12 },
                    { name: "Mphs", result: 12 },
                    { name: "Mphs", result: 12 },
                ],
            },
        ],
        // metrics: [
        //     { name: "Mpa", result: 23 },
        //     { name: "Mphs", result: 12 },
        //     { name: "Mphs", result: 12 },
        //     { name: "Mphs", result: 12 },
        //     { name: "Mphs", result: 12 },
        //     { name: "Mphs", result: 12 },
        //     { name: "Mphs", result: 12 },
        // ],
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

export function addMetric(categArr, metric) {
    const levels = categArr.length;
    // categArr.forEach((cat,index)=>{
    //     // find the object in the categories big object
    //     //that has the name cat
    //     // if cat last element of array add it in the metrics of that category
    //     const obj = categories.filter(categ=>categ.name === cat);
    //     console.log(obj);
    //     //do the same thing for object
    // })
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
    console.log(categories, "NEW FUNCTION NEW ME ");
}

export default categories;
