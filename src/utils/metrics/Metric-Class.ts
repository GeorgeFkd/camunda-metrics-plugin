import { Group } from "../../assets/typed-constants";
import { CalculateMetricFn } from "./utils";

export default class Metric {
    private _result: number;

    constructor(
        public readonly label: string,
        public readonly nullValue: number,
        public readonly calculateFn: CalculateMetricFn<Document>,
        public readonly displayInGroups: string[],
        public readonly tooltip:string
    ) {
        this.label = label;
        this._result = nullValue;
        this.calculateFn = calculateFn;
        this.displayInGroups = displayInGroups;
        this.tooltip = tooltip;
    }

    public get result() {
        return this._result;
    }

    calculateAndUpdateResult(input: Document): number {
        const res = this.calculateFn(input);
        this._result = Number(this.calculateFn(input).toFixed(2));
        return Number(res.toFixed(2));
    }
}
