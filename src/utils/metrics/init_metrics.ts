import { CATEGORIES, Group, MetricGroup } from "../../assets/typed-constants";
import MetricObjects from "./all";
import Metric from "./Metric-Class";
function initialiseMetricObjects(categories: Group[]) {
    console.log(MetricObjects, "ALL METRICS LESGOOOO");
    const CategoriesWithMetrics: MetricGroup[] = categories.map((catName) => ({
        name: catName,
        metrics: [],
    }));
    MetricObjects.map((obj, index) => {
        console.log(obj, index);
        const groupsThatMetricIsDisplayedIn = CategoriesWithMetrics.filter(
            ({ name }) => {
                return obj.displayInGroups.some(
                    (groupName) => groupName === name
                );
            }
        );
        console.log(groupsThatMetricIsDisplayedIn, obj, "bzit");
        groupsThatMetricIsDisplayedIn.map((group) => {
            return { ...group, metrics: group.metrics.push(obj) };
        });
    });
    return CategoriesWithMetrics;
}

const CATEGORIES_WITH_METRICS: MetricGroup[] =
    initialiseMetricObjects(CATEGORIES);

console.log("THIS IS WHAT IT LED TO: ", CATEGORIES_WITH_METRICS);

export default CATEGORIES_WITH_METRICS;
