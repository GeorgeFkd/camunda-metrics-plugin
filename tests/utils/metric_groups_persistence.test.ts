import {
    METRIC_GROUPS_CONFIG_VERSION,
    deserializeMetricGroups,
    serializeMetricGroups,
} from "../../src/store/metricGroupsPersistence";
import { MetricGroup } from "../../src/assets/typed-constants";
import availableMetrics from "../../src/utils/metrics/all";

const NOA = availableMetrics.find((m) => m.label === "NOA")!;
const CFC = availableMetrics.find((m) => m.label === "CFC")!;
const TS = availableMetrics.find((m) => m.label === "TS")!;

describe("metric groups persistence", () => {
    const groups: MetricGroup[] = [
        { name: "Activities", metrics: [NOA] },
        { name: "Flow", metrics: [CFC, TS] },
    ];

    it("serializes groups down to their name and metric labels", () => {
        expect(serializeMetricGroups(groups)).toEqual({
            version: METRIC_GROUPS_CONFIG_VERSION,
            groups: [
                { name: "Activities", metricLabels: ["NOA"] },
                { name: "Flow", metricLabels: ["CFC", "TS"] },
            ],
        });
    });

    it("round-trips back to the same metric objects", () => {
        const restored = deserializeMetricGroups(serializeMetricGroups(groups));
        expect(restored).toEqual(groups);
        //the real singletons are reused, not copies
        expect(restored![0].metrics[0]).toBe(NOA);
    });

    it("drops labels for metrics that no longer exist", () => {
        const restored = deserializeMetricGroups({
            version: METRIC_GROUPS_CONFIG_VERSION,
            groups: [{ name: "Flow", metricLabels: ["CFC", "GONE"] }],
        });
        expect(restored).toEqual([{ name: "Flow", metrics: [CFC] }]);
    });

    it("returns null for missing, malformed or wrong-version config", () => {
        expect(deserializeMetricGroups(null)).toBeNull();
        expect(deserializeMetricGroups(undefined)).toBeNull();
        expect(deserializeMetricGroups("nope")).toBeNull();
        expect(deserializeMetricGroups({ groups: "no" })).toBeNull();
        expect(
            deserializeMetricGroups({
                version: METRIC_GROUPS_CONFIG_VERSION + 1,
                groups: [{ name: "Flow", metricLabels: ["CFC"] }],
            })
        ).toBeNull();
    });

    it("returns null when every stored group is empty", () => {
        expect(
            deserializeMetricGroups({
                version: METRIC_GROUPS_CONFIG_VERSION,
                groups: [],
            })
        ).toBeNull();
    });

    it("keeps groups with a valid name even when they have no metrics", () => {
        const restored = deserializeMetricGroups({
            version: METRIC_GROUPS_CONFIG_VERSION,
            groups: [
                { name: "Empty", metricLabels: [] },
                { name: "Flow", metricLabels: ["CFC"] },
            ],
        });
        expect(restored).toEqual([
            { name: "Empty", metrics: [] },
            { name: "Flow", metrics: [CFC] },
        ]);
    });
});
