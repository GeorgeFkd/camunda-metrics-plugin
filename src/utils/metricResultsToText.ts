import { MetricGroup } from "../assets/typed-constants";
import { removeDuplicates } from "./metrics/utils";
export default function metricResultsToText(
    metricGroupsWithCalculatedResults: MetricGroup[]
): string {
    const CELL_DELIMITER = ",";
    const LINE_DELIMITER = "\n";
    //get the metrics out of the groups
    const metrics = metricGroupsWithCalculatedResults.flatMap(({ metrics }) => {
        return metrics;
    });
    const metricsNoDuplicates = metrics.filter(
        (item, index) => metrics.indexOf(item) === index
    );

    const firstLineWithMetricNames = metricsNoDuplicates
        .map((metric) => metric.label)
        .join(CELL_DELIMITER);

    const results = metricsNoDuplicates
        .map((metric) => String(metric.result.toFixed(2)))
        .join(CELL_DELIMITER);

    const finalText = [firstLineWithMetricNames, results].join(LINE_DELIMITER);

    return finalText;
}
