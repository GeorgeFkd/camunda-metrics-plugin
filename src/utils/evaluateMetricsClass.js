import {
    PAR_EVALUATIONS,
    RESEQ_EVALUATIONS,
    MODIFIABILITY_EVALUATIONS,
    CORRECTNESS_EVALUATIONS,
} from "../assets/constants";

class CategoryEvaluator {
    static INVALID_VALUE_ERROR =
        "No constraint's upperLimit was smaller than the metric's result";
    static INVALID_LEVEL_ERROR =
        "level for evaluation not within possible options";
    metrics;
    constraints;
    evaluationResults;
    categoryLabel;
    constructor(categoryLabel, evalResults) {
        this.constraints = [];
        this.metrics = [];
        this.evaluationResults = evalResults;
        this.categoryLabel = categoryLabel;
    }
    //probably not a wise move
    addMetricForEvaluation(name, isReversed) {
        this.metrics.push({ name, isReversed });
    }
    addConstraintForMetric(metricName, constraint) {
        //CHECKING IF EVALUATEUPPERLIMITASLEVEL IS SUPPORTED BY THE CATEGORY
        if (
            this.evaluationResults.length < constraint.evaluateUpperLimitAsLevel
        ) {
            throw Error(CategoryEvaluator.INVALID_LEVEL_ERROR);
        }
        this.constraints.push({ ...constraint, metricName });
    }
    addConstraintsForMetricWithArray(
        metricName,
        boundaryValuesArray,
        evaluationOfBoundaryValuesArray
    ) {
        if (
            boundaryValuesArray.length !==
            evaluationOfBoundaryValuesArray.length
        )
            throw Error(
                "specified upper limits and evaluation levels length don't match"
            );
        for (let i = 0; i < boundaryValuesArray.length; i++) {
            this.addConstraintForMetric(metricName, {
                upperLimit: boundaryValuesArray[i],
                evaluateUpperLimitAsLevel: evaluationOfBoundaryValuesArray[i],
            });
        }
    }
    //? the isReversed = true is for metrics that their evaluations get better as
    //? their result gets higher we might need the value too
    evaluateMetricByName(metricName, result) {
        console.log("currently the metrics", this.metrics);
        const theMetrics = this.metrics.filter(
            (metric) => metric.name === metricName
        );
        if (theMetrics.length === 0) {
            // throw Error(
            //     "Metric " +
            //         metricName +
            //         " was not found in Evaluator " +
            //         this.categoryLabel
            // );
            return "Not found in evaluator";
        }
        //?upperlimits must be checked from larger to smallest for this to work
        //?thats why we sort
        const constraintsForThisMetric = this.constraints
            .filter((constraint) => {
                return constraint.metricName === metricName;
            })
            .sort((a, b) => {
                return b.upperLimit - a.upperLimit;
            });
        for (let constraint of constraintsForThisMetric) {
            if (result > constraint.upperLimit) {
                if (
                    constraint.evaluateUpperLimitAsLevel >
                    this.evaluationResults.length
                )
                    throw Error(
                        "level of evaluation " +
                            constraint.evaluateUpperLimitAsLevel +
                            " is not supported in category Evaluator " +
                            this.categoryLabel
                    );
                if (theMetrics[0].isReversed) {
                    console.log("reversed em for this");
                    return this.evaluationResults.reverse()[
                        constraint.evaluateUpperLimitAsLevel - 1
                    ];
                }
                return this.evaluationResults[
                    constraint.evaluateUpperLimitAsLevel - 1
                ];
            }
        }
        if (theMetrics[0].isReversed) return this.evaluationResults[0];
        return this.evaluationResults[this.evaluationResults.length - 1];
        console.info("Metric is beyond the current constraints");
        //throw Error(CategoryEvaluator.INVALID_VALUE_ERROR);
    }
}

//create and export the objects
function initialiseEvaluators() {
    const allEvaluators = [];
    const reseqEvaluator = new CategoryEvaluator("RESEQ", RESEQ_EVALUATIONS);
    initialiseReseqConstraints(reseqEvaluator);
    const parEvaluator = new CategoryEvaluator("PAR", PAR_EVALUATIONS);
    initialiseParConstraints(parEvaluator);
    const modifiabilityEvaluator = new CategoryEvaluator(
        "MODIFIABILITY",
        MODIFIABILITY_EVALUATIONS
    );
    initialiseModifiabilityConstraints(modifiabilityEvaluator);
    const correctnessEvaluator = new CategoryEvaluator(
        "CORRECTNESS",
        CORRECTNESS_EVALUATIONS
    );
    initialiseCorrectnessConstraints(correctnessEvaluator);
    return [
        reseqEvaluator,
        parEvaluator,
        modifiabilityEvaluator,
        correctnessEvaluator,
    ];
}

function initialiseReseqConstraints(reseqEvaluator) {
    //!second argument is whether the metric
    //!has its biggest value at the worst(false) or best valuation(true)
    reseqEvaluator.addMetricForEvaluation("CLA", false);
    reseqEvaluator.addMetricForEvaluation("NOA", true);
    reseqEvaluator.addMetricForEvaluation("CFC", true);
    reseqEvaluator.addMetricForEvaluation("NSFA", true);
    //prettier-ignore
    reseqEvaluator.addConstraintsForMetricWithArray(
        "NOA",
        [1, 8, 13, 18, 26],
        [1, 2, 3, 4, 5]
    );
    reseqEvaluator.addConstraintsForMetricWithArray(
        "CLA",
        [4.94, 4.23, 3.78, 3.33, 2.62, 0],
        [1, 2, 3, 4, 5, 6]
    );
    reseqEvaluator.addConstraintsForMetricWithArray(
        "CFC",
        [0, 4, 7, 11, 16, Infinity],
        [1, 2, 3, 4, 5, 6]
    );
    reseqEvaluator.addConstraintsForMetricWithArray(
        "NSFA",
        [2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5]
    );

    return reseqEvaluator;
}

function initialiseParConstraints(parEvaluator) {
    parEvaluator.addMetricForEvaluation("CLA", false);
    parEvaluator.addMetricForEvaluation("NOAJS", false);
    parEvaluator.addMetricForEvaluation("CFC", false);
    parEvaluator.addMetricForEvaluation("NSFA", true);
    parEvaluator.addMetricForEvaluation("NSFG", false);
    parEvaluator.addMetricForEvaluation("TNG", false);
    parEvaluator.addMetricForEvaluation("TS", false);

    parEvaluator.addConstraintsForMetricWithArray(
        "CLA",
        [2.58, 2.17, 1.91, 1.65, 1.24],
        [1, 2, 3, 4, 5]
    );

    parEvaluator.addConstraintsForMetricWithArray(
        "NOAJS",
        [74, 50, 36, 21, 0],
        [1, 2, 3, 4, 5]
    );

    parEvaluator.addConstraintsForMetricWithArray(
        "CFC",
        [22, 15, 11, 7, 0],
        [1, 2, 3, 4, 5]
    );
    parEvaluator.addConstraintsForMetricWithArray(
        "NSFA",
        [2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5]
    );

    parEvaluator.addConstraintsForMetricWithArray(
        "NSFG",
        [27, 17, 11, 5, 0],
        [1, 2, 3, 4, 5]
    );

    parEvaluator.addConstraintsForMetricWithArray(
        "TNG",
        [17, 11, 7, 3, 0],
        [1, 2, 3, 4, 5]
    );

    parEvaluator.addConstraintsForMetricWithArray(
        "TS",
        [10, 6, 3, 1, 0],
        [1, 2, 3, 4, 5]
    );
}

function initialiseModifiabilityConstraints(modifiabilityEvaluator) {
    modifiabilityEvaluator.addMetricForEvaluation("AGD", false);
    addConstraintsForMetricWithArray(
        modifiabilityEvaluator,
        "AGD",
        [4.06, 3.88, 3.83, 0],
        [1, 2, 3, 4]
    );
    modifiabilityEvaluator.addMetricForEvaluation("MGD", false);
    addConstraintsForMetricWithArray(
        modifiabilityEvaluator,
        "MGD",
        [7, 5, 0],
        [1, 3, 4]
    );
    modifiabilityEvaluator.addMetricForEvaluation("GM", false);
    addConstraintsForMetricWithArray(
        modifiabilityEvaluator,
        "GM",
        [42, 24, 12, 1, 0],
        [1, 2, 3, 4, 5]
    );
    modifiabilityEvaluator.addMetricForEvaluation("GH", false);
    addConstraintsForMetricWithArray(
        modifiabilityEvaluator,
        "GH",
        [22.8, 13.2, 7.15, 1.09, 0],
        [1, 2, 3, 4, 5]
    );
}

function initialiseCorrectnessConstraints(correctnessEvaluator) {
    correctnessEvaluator.addMetricForEvaluation("AGD", false);
    addConstraintsForMetricWithArray(
        correctnessEvaluator,
        "AGD",
        [3.09, 0],
        [1, 2]
    );
    correctnessEvaluator.addMetricForEvaluation("MGD", false);
    addConstraintsForMetricWithArray(
        correctnessEvaluator,
        "MGD",
        [3.5, 0],
        [1, 2]
    );
    correctnessEvaluator.addMetricForEvaluation("GM", false);
    addConstraintsForMetricWithArray(
        correctnessEvaluator,
        "GM",
        [4.5, 0],
        [1, 2]
    );

    correctnessEvaluator.addMetricForEvaluation("GH", false);
    addConstraintsForMetricWithArray(
        correctnessEvaluator,
        "GH",
        [0.4, 0],
        [1, 2]
    );
}

function addConstraintsForMetricWithArray(
    categoryEvaluator,
    metricName,
    upperLimitsArr,
    evaluateUpperLimitAsLevelArr
) {
    if (upperLimitsArr.length !== evaluateUpperLimitAsLevelArr.length)
        throw Error(
            "specified upper limits and evaluation levels length don't match"
        );
    for (let i = 0; i < upperLimitsArr.length; i++) {
        categoryEvaluator.addConstraintForMetric(metricName, {
            upperLimit: upperLimitsArr[i],
            evaluateUpperLimitAsLevel: evaluateUpperLimitAsLevelArr[i],
        });
    }
    return categoryEvaluator;
}

const CATEGORY_EVALUATOR_NOT_FOUND = "This category evaluator does not exist";

export default function evaluateMetric(
    result,
    metricName,
    categoryToEvaluateIn
) {
    //get the appropriate CategoryEvaluator and call the proper method
    //this would be ideally initialised once only
    const allEvals = initialiseEvaluators();
    console.log("KOWALSKI evaluation");
    console.log(result, metricName, categoryToEvaluateIn);
    console.log("Objects to choose from", allEvals);
    const categEval = allEvals.filter((evaluatorObject) => {
        return evaluatorObject.categoryLabel === categoryToEvaluateIn;
    });
    if (categEval.length === 0) {
        return CATEGORY_EVALUATOR_NOT_FOUND;
    }
    //i gotta see how this will be supplied
    return categEval[0].evaluateMetricByName(metricName, result);
}
