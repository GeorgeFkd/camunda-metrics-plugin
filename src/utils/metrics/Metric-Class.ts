import { Group } from "../../assets/typed-constants";
import { CalculateMetricFn } from "./utils";

export default class Metric {
    private _result: number;

    constructor(
        public readonly label: string,
        public readonly nullValue: number,
        public readonly calculateFn: CalculateMetricFn<Document>,
        public readonly displayInGroups: string[]
    ) {
        this.label = label;
        this._result = nullValue;
        this.calculateFn = calculateFn;
        this.displayInGroups = displayInGroups;
    }

    public get result() {
        return this._result;
    }

    calculateAndUpdateResult(input: Document): void {
        this._result = this.calculateFn(input);
    }
}
