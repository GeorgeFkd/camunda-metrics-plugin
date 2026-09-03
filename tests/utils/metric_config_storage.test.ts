import {
    loadMetricGroups,
    resetMetricGroups,
    saveMetricGroups,
} from "../../src/utils/metricConfigStorage";
import { METRIC_GROUPS_CONFIG_KEY } from "../../src/store/metricGroupsPersistence";
import { MetricGroup } from "../../src/assets/typed-constants";
import availableMetrics from "../../src/utils/metrics/all";

const CFC = availableMetrics.find((m) => m.label === "CFC")!;
const NOA = availableMetrics.find((m) => m.label === "NOA")!;

const groups: MetricGroup[] = [{ name: "Flow", metrics: [CFC, NOA] }];
const savedFile = { path: "/tmp/diagram.bpmn" };
const unsavedFile = { path: undefined };

//in-memory stand-in for Camunda Modeler's config store
function makeConfig() {
    const global: Record<string, unknown> = {};
    const perFile: Record<string, unknown> = {};
    return {
        global,
        perFile,
        get: jest.fn(async (key: string, dflt: unknown) =>
            key in global ? global[key] : dflt
        ),
        set: jest.fn(async (key: string, value: unknown) => {
            global[key] = value;
        }),
        getForFile: jest.fn(
            async (file: { path?: string }, key: string, dflt: unknown) => {
                const k = `${file.path}::${key}`;
                return k in perFile ? perFile[k] : dflt;
            }
        ),
        setForFile: jest.fn(
            async (file: { path?: string }, key: string, value: unknown) => {
                perFile[`${file.path}::${key}`] = value;
            }
        ),
    };
}

describe("metric config storage", () => {
    it("saves a saved diagram per file, leaving the global default untouched", async () => {
        const config = makeConfig();
        await saveMetricGroups(config, savedFile, groups);
        expect(config.setForFile).toHaveBeenCalledTimes(1);
        expect(config.set).not.toHaveBeenCalled();
        expect(await loadMetricGroups(config, savedFile)).toEqual(groups);
    });

    it("also writes the global default when asDefault is set", async () => {
        const config = makeConfig();
        await saveMetricGroups(config, savedFile, groups, { asDefault: true });
        expect(config.setForFile).toHaveBeenCalledTimes(1);
        expect(config.set).toHaveBeenCalledTimes(1);
        //a brand new diagram now starts from these groups
        expect(await loadMetricGroups(config, unsavedFile)).toEqual(groups);
    });

    it("saves an unsaved diagram as the global default", async () => {
        const config = makeConfig();
        await saveMetricGroups(config, unsavedFile, groups);
        expect(config.setForFile).not.toHaveBeenCalled();
        expect(config.global[METRIC_GROUPS_CONFIG_KEY]).toBeDefined();
    });

    it("prefers the per-file config, then the global default, then null", async () => {
        const config = makeConfig();
        expect(await loadMetricGroups(config, savedFile)).toBeNull();

        await saveMetricGroups(config, unsavedFile, [{ name: "G", metrics: [NOA] }]);
        expect(await loadMetricGroups(config, savedFile)).toEqual([
            { name: "G", metrics: [NOA] },
        ]);

        await saveMetricGroups(config, savedFile, groups);
        expect(await loadMetricGroups(config, savedFile)).toEqual(groups);
    });

    it("reset clears the per-file entry so the diagram falls back to the default", async () => {
        const config = makeConfig();
        await saveMetricGroups(config, unsavedFile, [{ name: "G", metrics: [NOA] }]);
        await saveMetricGroups(config, savedFile, groups);

        await resetMetricGroups(config, savedFile);

        expect(config.setForFile).toHaveBeenLastCalledWith(
            savedFile,
            METRIC_GROUPS_CONFIG_KEY,
            null
        );
        expect(await loadMetricGroups(config, savedFile)).toEqual([
            { name: "G", metrics: [NOA] },
        ]);
    });

    it("reset clears the global default for an unsaved diagram", async () => {
        const config = makeConfig();
        await saveMetricGroups(config, unsavedFile, groups);
        await resetMetricGroups(config, unsavedFile);
        expect(await loadMetricGroups(config, unsavedFile)).toBeNull();
    });

    it("is a no-op without a config store", async () => {
        await expect(
            saveMetricGroups(undefined, savedFile, groups)
        ).resolves.toBeUndefined();
        await expect(
            resetMetricGroups(null, savedFile)
        ).resolves.toBeUndefined();
        expect(await loadMetricGroups(undefined, savedFile)).toBeNull();
    });
});
