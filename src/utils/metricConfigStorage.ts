import { MetricGroup } from "../assets/typed-constants";
import {
    METRIC_GROUPS_CONFIG_KEY,
    PersistedMetricGroups,
    deserializeMetricGroups,
    serializeMetricGroups,
} from "../store/metricGroupsPersistence";

//The subset of the tab's `file` object we care about. Unsaved diagrams have no
//`path`, which is exactly how we tell "this needs the global default" apart from
//"this file has its own saved config".
export interface ModelerFile {
    path?: string;
}

//The `config` prop Camunda Modeler passes to client plugins. `getForFile` /
//`setForFile` persist a value scoped to a single file (keyed by its path) in the
//Modeler's config store; `get` / `set` are the global fallback. Older Modeler
//versions may only expose `get` / `set`, so everything is optional here.
export interface ModelerConfig {
    get?: (key: string, defaultValue?: unknown) => Promise<unknown> | unknown;
    set?: (key: string, value: unknown) => Promise<unknown> | unknown;
    getForFile?: (
        file: ModelerFile,
        key: string,
        defaultValue?: unknown
    ) => Promise<unknown> | unknown;
    setForFile?: (
        file: ModelerFile,
        key: string,
        value: unknown
    ) => Promise<unknown> | unknown;
}

function hasPerFileConfig(
    config: ModelerConfig,
    file: ModelerFile | null | undefined
): file is ModelerFile {
    return Boolean(
        file &&
            file.path &&
            typeof config.getForFile === "function" &&
            typeof config.setForFile === "function"
    );
}

//Reads the stored metric groups for `file` (or the global default when the file
//is unsaved / has none). Returns null when nothing usable is stored so the
//caller can keep the built-in defaults. Never throws.
export async function loadMetricGroups(
    config: ModelerConfig | null | undefined,
    file: ModelerFile | null | undefined
): Promise<MetricGroup[] | null> {
    if (!config) return null;
    try {
        let stored: unknown = null;
        if (hasPerFileConfig(config, file)) {
            stored = await config.getForFile!(
                file,
                METRIC_GROUPS_CONFIG_KEY,
                null
            );
        }
        //no per-file entry (or unsaved file) -> fall back to the global default
        if (
            (stored === null || stored === undefined) &&
            typeof config.get === "function"
        ) {
            stored = await config.get(METRIC_GROUPS_CONFIG_KEY, null);
        }
        return deserializeMetricGroups(stored as PersistedMetricGroups | null);
    } catch (err) {
        console.warn(
            "[camunda-metrics-plugin] could not load metric config",
            err
        );
        return null;
    }
}

//Persists `groups` for `file` when it is saved, otherwise as the global default
//that new/unsaved files start from. With `asDefault` a saved file also writes
//the global default, so "new diagrams start from this" is an explicit opt-in
//(for an unsaved file the global write already is the only option). Never throws.
export async function saveMetricGroups(
    config: ModelerConfig | null | undefined,
    file: ModelerFile | null | undefined,
    groups: MetricGroup[],
    options: { asDefault?: boolean } = {}
): Promise<void> {
    if (!config) return;
    const payload = serializeMetricGroups(groups);
    try {
        if (hasPerFileConfig(config, file)) {
            await config.setForFile!(file, METRIC_GROUPS_CONFIG_KEY, payload);
            if (options.asDefault && typeof config.set === "function") {
                await config.set(METRIC_GROUPS_CONFIG_KEY, payload);
            }
        } else if (typeof config.set === "function") {
            await config.set(METRIC_GROUPS_CONFIG_KEY, payload);
        }
    } catch (err) {
        console.warn(
            "[camunda-metrics-plugin] could not save metric config",
            err
        );
    }
}

//Clears the stored config for whichever scope `saveMetricGroups` would write to:
//the file's own entry for a saved diagram, otherwise the global default. After
//this, `loadMetricGroups` falls back to the next tier (global, then the
//built-in defaults). Never throws.
export async function resetMetricGroups(
    config: ModelerConfig | null | undefined,
    file: ModelerFile | null | undefined
): Promise<void> {
    if (!config) return;
    try {
        if (hasPerFileConfig(config, file)) {
            await config.setForFile!(file, METRIC_GROUPS_CONFIG_KEY, null);
        } else if (typeof config.set === "function") {
            await config.set(METRIC_GROUPS_CONFIG_KEY, null);
        }
    } catch (err) {
        console.warn(
            "[camunda-metrics-plugin] could not reset metric config",
            err
        );
    }
}
