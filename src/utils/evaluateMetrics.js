//my constants here
//! the constants could include a color
//! .NOT_OK.text and .NOT_OK.color red green orange
//! and the spectrum in between
const EvaluationResultInCorrectness = {
    NOT_OK: "has errors",
    OK: "error free",
};

const EvaluationResultInModifiability = {
    VERY_DIFFICULT: "very difficult to modify",
    DIFFICULT: "difficult to modify",
    MODERATELY_MODIFIABLE: "moderately modifiable",
    EASY: "easy to modify",
    VERY_EASY: "very easy to modify",
};

const EvaluationResultPlasticity = {
    VERY_EFFICIENT: "very efficient",
    RATHER_EFFICIENT: "rather efficient",
    MODERATELY_EFFICIENT: "moderately efficient",
    RATHER_INEFFICIENT: "rather inefficient",
    VERY_INEFFICIENT: "very inefficient",
};

// (number)=>string
//? i could somehow generalise this WITH A CLASS PROBABLY
function evaluateTS_Correctness(TS) {
    if (TS <= 7.5) return EvaluationResultInCorrectness.NOT_OK;
    return EvaluationResultInCorrectness.OK;
}

function evaluateAGD_Correctness(AGD) {
    if (AGD > 3.09) return EvaluationResultInCorrectness.NOT_OK;
    return EvaluationResultInCorrectness.OK;
}

function evaluateMGD_Correctness(MGD) {
    if (MGD > 3.5) return EvaluationResultInCorrectness.NOT_OK;
    return EvaluationResultInCorrectness.OK;
}

function evaluateGM_Correctness(GM) {
    if (GM > 4.5) return EvaluationResultInCorrectness.NOT_OK;
    return EvaluationResultInCorrectness.OK;
}

function evaluateGH_Correctness(GH) {
    if (GH > 0.4) return EvaluationResultInCorrectness.NOT_OK;
    return EvaluationResultInCorrectness.OK;
}

function evaluateSequentiality_Correctness(SEQ) {
    if (SEQ > 0.21) return EvaluationResultInCorrectness.NOT_OK;
    return EvaluationResultInCorrectness.OK;
}

function evaluateAGD_Modifiability(AGD) {
    if (AGD > 4.06) return EvaluationResultInModifiability.VERY_DIFFICULT;
    if (AGD > 3.88) return EvaluationResultInModifiability.DIFFICULT;
    if (AGD > 3.83)
        return EvaluationResultInModifiability.MODERATELY_MODIFIABLE;
    return EvaluationResultInModifiability.EASY;
}

function evaluateMGD_Modifiability(MGD) {
    if (MGD > 7) return EvaluationResultInModifiability.VERY_DIFFICULT;
    if (MGD > 5) return EvaluationResultInModifiability.MODERATELY_MODIFIABLE;
    return EvaluationResultInModifiability.EASY;
}

function evaluateGH_Modifiability(GH) {
    if (GH > 22.8) return EvaluationResultInModifiability.VERY_DIFFICULT;
    if (GH > 13.2) return EvaluationResultInModifiability.DIFFICULT;
    if (GH > 7.15) return EvaluationResultInModifiability.MODERATELY_MODIFIABLE;
    if (GH > 1.09) return EvaluationResultInModifiability.EASY;
    return EvaluationResultInModifiability.VERY_EASY;
}

function evaluateNSFG_Modifiability(NSFG) {
    if (NSFG > 31.1) return EvaluationResultInModifiability.VERY_DIFFICULT;
    if (NSFG > 18.4) return EvaluationResultInModifiability.DIFFICULT;
    if (NSFG > 9.26)
        return EvaluationResultInModifiability.MODERATELY_MODIFIABLE;
    if (NSFG > 0.05) return EvaluationResultInModifiability.EASY;
    return EvaluationResultInModifiability.VERY_EASY;
}
function evaluateCFC_Modifiability(CFC) {
    if (CFC > 50.6) return EvaluationResultInModifiability.VERY_DIFFICULT;
    if (CFC > 26.9) return EvaluationResultInModifiability.DIFFICULT;
    if (CFC > 12.1)
        return EvaluationResultInModifiability.MODERATELY_MODIFIABLE;
    if (CFC > 5) return EvaluationResultInModifiability.EASY;
    return EvaluationResultInModifiability.VERY_EASY;
}

function evaluateGM_Modifiability(GM) {
    if (GM > 42) return EvaluationResultInModifiability.VERY_DIFFICULT;
    if (GM > 24) return EvaluationResultInModifiability.DIFFICULT;
    if (GM > 12) return EvaluationResultInModifiability.MODERATELY_MODIFIABLE;
    if (GM > 1) return EvaluationResultInModifiability.EASY;
    return EvaluationResultInModifiability.VERY_EASY;
}

function evaluateTNG_Par(TNG) {
    if (TNG > 17) return EvaluationResultPlasticity.VERY_INEFFICIENT;
    if (TNG > 11) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    if (TNG > 7) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (TNG > 3) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    return EvaluationResultPlasticity.VERY_EFFICIENT;
}

function evaluateCLA_Par(CLA) {
    if (CLA > 2.58) return EvaluationResultPlasticity.VERY_INEFFICIENT;
    if (CLA > 2.17) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    if (CLA > 1.91) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (CLA > 1.65) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    // > 1.24 very efficient an einai mikrotero ti?
    return EvaluationResultPlasticity.VERY_EFFICIENT;
}

function evaluateNSFG_Par(NSFG) {
    if (NSFG > 27) return EvaluationResultPlasticity.VERY_INEFFICIENT;
    if (NSFG > 17) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    if (NSFG > 11) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (NSFG > 5) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    return EvaluationResultPlasticity.VERY_EFFICIENT;
}

function evaluateNSFA_Par(NSFA) {
    if (NSFA > 18) return EvaluationResultPlasticity.VERY_EFFICIENT;
    if (NSFA > 11) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    if (NSFA > 6) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (NSFA > 1) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    return EvaluationResultPlasticity.VERY_INEFFICIENT;
}

function evaluateNoAJS_Par(NOAJS) {
    if (NOAJS > 74) return EvaluationResultPlasticity.VERY_INEFFICIENT;
    if (NOAJS > 50) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    if (NOAJS > 36) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (NOAJS > 21) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    return EvaluationResultPlasticity.VERY_EFFICIENT;
}

function evaluateCFC_Par(CFC) {
    if (CFC > 10) return EvaluationResultPlasticity.VERY_INEFFICIENT;
    if (CFC > 6) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    if (CFC > 3) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (CFC > 1) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    return EvaluationResultPlasticity.VERY_EFFICIENT;
}

function evaluateTS_Par(TS) {
    if (TS > 10) return EvaluationResultPlasticity.VERY_INEFFICIENT;
    if (TS > 6) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    if (TS > 3) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (TS > 1) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    return EvaluationResultPlasticity.VERY_EFFICIENT;
}

function evaluateTNG_Modifiability(TNG) {
    if (TNG > 18) return EvaluationResultInModifiability.VERY_DIFFICULT;
    if (TNG > 16) return EvaluationResultInModifiability.DIFFICULT;
    if (TNG > 12) return EvaluationResultInModifiability.MODERATELY_MODIFIABLE;
    return EvaluationResultInModifiability.EASY;
}

function evaluateCLA_Reseq(CLA) {
    if (CLA > 4.94) return EvaluationResultPlasticity.VERY_INEFFICIENT;
    if (CLA > 4.23) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    if (CLA > 3.78) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (CLA > 3.33) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    return EvaluationResultPlasticity.VERY_EFFICIENT;
}

function evaluateNoA_Reseq(NOA) {
    if (NOA > 26) return EvaluationResultPlasticity.VERY_EFFICIENT;
    if (NOA > 18) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    if (NOA > 13) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (NOA > 8) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    return EvaluationResultPlasticity.VERY_INEFFICIENT;
}

function evaluateCFC_Reseq(CFC) {
    if (CFC > 16) return EvaluationResultPlasticity.VERY_EFFICIENT;
    if (CFC > 11) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    if (CFC > 7) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (CFC > 4) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    return EvaluationResultPlasticity.VERY_INEFFICIENT;
}

function evaluateNSFA_Reseq(NSFA) {
    if (NSFA > 6) return EvaluationResultPlasticity.VERY_EFFICIENT;
    if (NSFA > 5) return EvaluationResultPlasticity.RATHER_EFFICIENT;
    if (NSFA > 4) return EvaluationResultPlasticity.MODERATELY_EFFICIENT;
    if (NSFA > 3) return EvaluationResultPlasticity.RATHER_INEFFICIENT;
    return EvaluationResultPlasticity.VERY_INEFFICIENT;
}

function evaluateGM(GM, categoryName) {
    const info = "GM";
    console.log("Eval " + GM + " " + info + " in " + categoryName);
    if (categoryName.toLowerCase() === "correctness")
        return evaluateGM_Correctness(GM);
    if (categoryName.toLowerCase() === "modifiability")
        return evaluateGM_Modifiability(GM);
    return "hehe";
    //throw Error("This metric in that category cannot be evaluated yet.");
}

function evaluateAGD(AGD, categoryName) {
    const info = "AGD";
    console.log("Eval " + AGD + " " + info + " in " + categoryName);
    if (categoryName.toLowerCase() === "correctness")
        return evaluateAGD_Correctness(AGD);
    if (categoryName.toLowerCase() === "modifiability")
        return evaluateAGD_Modifiability(AGD);
    return "hehe";

    //throw Error("This metric in that category cannot be evaluated yet.");
}

function evaluateMGD(MGD, categoryName) {
    const info = "MGD";
    console.log("Eval " + MGD + " " + info + " in " + categoryName);
    if (categoryName.toLowerCase() === "correctness")
        return evaluateMGD_Correctness(MGD);
    if (categoryName.toLowerCase() === "modifiability")
        return evaluateMGD_Modifiability(MGD);
    return "hehe";

    //throw Error("This metric in that category cannot be evaluated yet.");
}

function evaluateTNG(TNG, categoryName) {
    const info = "TNG";
    console.log("Eval " + TNG + " " + info + " in " + categoryName);
    if (categoryName.toLowerCase() === "par") return evaluateTNG_Par(TNG);
    if (categoryName.toLowerCase() === "modifiability")
        return evaluateTNG_Modifiability(TNG);
    return "hehe";
}
function evaluateNoA(NoA, categoryName) {
    if (categoryName.toLowerCase() === "reseq") return evaluateNoA_Reseq(NoA);
    return "hehe";
}
function evaluateNSFA(NSFA, categoryName) {
    if (categoryName.toLowerCase() === "par") return evaluateNSFA_Par(NSFA);
    if (categoryName.toLowerCase() === "reseq") return evaluateNSFA_Reseq(NSFA);
}
function evaluateNoAJS(NOAJS, categoryName) {
    if (categoryName.toLowerCase() === "par") return evaluateNoAJS_Par(NOAJS);
}
function evaluateCLA(CLA, categoryName) {
    const info = "CLA";
    console.log("Eval " + CLA + " " + info + " in " + categoryName);
    if (categoryName.toLowerCase() === "par") return evaluateCLA_Par(CLA);
    if (categoryName.toLowerCase() === "reseq") return evaluateCLA_Reseq(CLA);
}
function evaluateNSFG(NSFG, categoryName) {
    if (categoryName.toLowerCase() === "par") return evaluateNSFG_Par(NSFG);
    if (categoryName.toLowerCase() === "modifiability")
        return evaluateNSFG_Modifiability(NSFG);
}
function evaluateTS(TS, categoryName) {
    const info = "TS";
    console.log("Eval " + TS + " " + info + " in " + categoryName);
    if (categoryName.toLowerCase() === "par") return evaluateTS_Par(TS);
    if (categoryName.toLowerCase() === "correctness")
        return evaluateTS_Correctness(TS);
}
function evaluateCFC(CFC, categoryName) {
    if (categoryName.toLowerCase() === "par") return evaluateCFC_Par(CFC);
    if (categoryName.toLowerCase() === "reseq") return evaluateCFC_Reseq(CFC);
}
function evaluateGH(GH, categoryName) {
    if (categoryName.toLowerCase() === "modifiability")
        return evaluateGH_Modifiability(GH);
    if (categoryName.toLowerCase() === "correctness")
        return evaluateGH_Correctness(GH);
}
const mapMetricNameToFunc = new Map();
mapMetricNameToFunc.set("AGD", evaluateAGD);
mapMetricNameToFunc.set("MGD", evaluateMGD);
mapMetricNameToFunc.set("NSFA", evaluateNSFA);
mapMetricNameToFunc.set("NOA", evaluateNoA);
mapMetricNameToFunc.set("NOAJS", evaluateNoAJS);
mapMetricNameToFunc.set("NSFG", evaluateNSFG);
mapMetricNameToFunc.set("CLA", evaluateCLA);
mapMetricNameToFunc.set("TS", evaluateTS);
mapMetricNameToFunc.set("GM", evaluateGM);
mapMetricNameToFunc.set("CFC", evaluateCFC);
mapMetricNameToFunc.set("TNG", evaluateTNG);
mapMetricNameToFunc.set("GH", evaluateGH);
export default function evaluateMetric(metricName, categoryName, result) {
    const evalFn = mapMetricNameToFunc.get(metricName);
    if (!evalFn) return "OOPS";
    return evalFn(result, categoryName);
}

//mia synarthsh pou na pairnei kathgoria kai onoma metrikhs
//kai na epistrefei ton xarakthrismo
