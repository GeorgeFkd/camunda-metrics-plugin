import Metric from "../utils/metrics/Metric-Class";
import { CalculateMetricFn } from "../utils/metrics/utils";

//practically categories theoretically heuristics
enum HEURISTIC_NAMES {
    PLASTICITY = "PLASTICITY",
    RESEQ = "RESEQ",
    PAR = "PAR",
    MODIFIABILITY = "MODIFIABILITY",
    CORRECTNESS = "CORRECTNESS",
}
type evaluation =
    | RESEQ_EVALUATIONS
    | PAR_EVALUATIONS
    | MODIFIABILITY_EVALUATIONS
    | CORRECTNESS_EVALUATIONS;
//? i will see how those play out, it might make sense to number them
enum RESEQ_EVALUATIONS {
    VERY_INEFFICIENT = "very inefficient",
    RATHER_INEFFICIENT = "rather inefficient",
    MODERATELY_INEFFICIENT = "moderately inefficient",
    MODERATELY_EFFICIENT = "moderately efficient",
    RATHER_EFFICIENT = "rather efficient",
    VERY_EFFICIENT = "very efficient",
}
enum PAR_EVALUATIONS {
    VERY_INEFFICIENT = "very inefficient",
    RATHER_INEFFICIENT = "rather inefficient",
    MODERATELY_INEFFICIENT = "moderately inefficient",
    MODERATELY_EFFICIENT = "moderately efficient",
    RATHER_EFFICIENT = "rather efficient",
    VERY_EFFICIENT = "very efficient",
}

enum MODIFIABILITY_EVALUATIONS {
    VERY_DIFFICULT_TO_MODIFY = "very difficult to modify",
    DIFFICULT_TO_MODIFY = "difficult to modify",
    MODERATELY_MODIFIABLE = "moderately modifiable",
    EASY_TO_MODIFY = "easy to modify",
    VERY_EASY_TO_MODIFY = "very easy to modify",
}

export type Group = "Gateways" | "Events" | "Activities" | "Flow";

enum CORRECTNESS_EVALUATIONS {
    HAS_ERRORS = "has errors",
    ERROR_FREE = "error free",
}

export interface MetricGroup {
    name: string;
    metrics: Metric[];
}
export const CATEGORIES: Group[] = ["Gateways", "Activities", "Flow"];
