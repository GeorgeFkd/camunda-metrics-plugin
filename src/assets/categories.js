//THIS WILL BREAK IF A CATEGORY HAS METRICS
//THAT BELONG IN A SUBCATEGORY
//AND THE CATEGORY ITSELF

//another idea hard coding it like
//level1:[cat1,cat2] level2[[cat22,cat33],[]] level3
//so cat1 has cat22 and cat33 but cat2 has no subcategories
const categories = [
    {
        name: "PLASTICITY",
        categories: [
            {
                name: "RESEQ",
                metrics: [
                    { name: "CLA", result: 3 },
                    { name: "CFC", result: 2 },
                    { name: "NOA", result: 2 },
                    { name: "NSFA", result: 2 },
                ],
            },
            {
                name: "PAR",
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
        name: "MODIFIABILITY",
        metrics: [
            { name: "AGD", result: 3 },
            { name: "MGD", result: 2 },
            { name: "GM", result: 12 },
            { name: "GH", result: 12 },
        ],
    },
    {
        name: "CORRECTNESS",
        metrics: [
            { name: "AGD", result: 3 },
            { name: "MGD", result: 2 },
            { name: "GM", result: 12 },
            { name: "GH", result: 12 },
        ],
    },
];

export default categories;
