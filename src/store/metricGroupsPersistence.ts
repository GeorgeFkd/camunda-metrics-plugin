import { MetricGroup } from "../assets/typed-constants";
import availableMetrics from "../utils/metrics/all";
import Metric from "../utils/metrics/Metric-Class";

//Key the plugin config is stored under, both globally (default for new/unsaved
//files) and per file. Namespaced so it never collides with other plugins.
export const METRIC_GROUPS_CONFIG_KEY = "camundaMetricsPlugin.metricGroups";

//Bump when the shape of PersistedMetricGroups changes so old configs can be
//detected and ignored/migrated instead of crashing the plugin.
export const METRIC_GROUPS_CONFIG_VERSION = 1;

//A Metric carries its calculateFn (not serializable), so on disk we only keep
//the group name + the labels of the metrics it contains. On load the real
//Metric objects are looked up from the metric registry by label.
export interface PersistedMetricGroups {
    version: number;
    groups: { name: string; metricLabels: string[] }[];
}

export function serializeMetricGroups(
    groups: MetricGroup[]
): PersistedMetricGroups {
    return {
        version: METRIC_GROUPS_CONFIG_VERSION,
        groups: groups.map((group) => ({
            name: group.name,
            metricLabels: group.metrics.map((metric) => metric.label),
        })),
    };
}

//Turns stored config back into MetricGroup[]. Returns null when there is nothing
//usable (missing/garbage config, unknown version, every group empty) so callers
//can fall back to the built-in defaults.
export function deserializeMetricGroups(
    persisted: unknown,
    metricPool: Metric[] = availableMetrics
): MetricGroup[] | null {
    if (!isPersistedMetricGroups(persisted)) return null;
    if (persisted.version !== METRIC_GROUPS_CONFIG_VERSION) return null;

    const metricByLabel = new Map<string, Metric>(
        metricPool.map((metric) => [metric.label, metric])
    );

    const groups: MetricGroup[] = persisted.groups
        .filter(
            (group) =>
                group &&
                typeof group.name === "string" &&
                Array.isArray(group.metricLabels)
        )
        .map((group) => ({
            name: group.name,
            metrics: group.metricLabels
                .map((label) => metricByLabel.get(label))
                //drop labels for metrics that no longer exist in this version
                .filter((metric): metric is Metric => metric !== undefined),
        }));

    return groups.length > 0 ? groups : null;
}

function isPersistedMetricGroups(value: unknown): value is PersistedMetricGroups {
    return (
        typeof value === "object" &&
        value !== null &&
        Array.isArray((value as PersistedMetricGroups).groups)
    );
}
