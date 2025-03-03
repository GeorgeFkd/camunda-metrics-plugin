import Metric from "./Metric-Class";
import { CalculateMetricFn, getGatewaysInDiagram } from "./utils";
const GH: CalculateMetricFn<Document> = (xmlDoc: Document) => {
    const gatewaysOfDiagram = getGatewaysInDiagram(xmlDoc);
    //? Are all gateways included in the calculation or only AND, XOR, OR?
    // /.+:/
    const numberOfGatewaysInDiagram = gatewaysOfDiagram.length;
    if (numberOfGatewaysInDiagram === 0) return -1;
    const result = new Map<string, number>();
    gatewaysOfDiagram.map((current) => {
        //vlepoume ti typos einai
        const typeOfGateway = current.nodeName.replace(/.+:/, "");
        if (result.get(typeOfGateway) !== undefined) {
            //for some reason TS doesnt get it as defined
            result.set(
                typeOfGateway,
                (result.get(typeOfGateway) as number) + 1
            );
        } else {
            result.set(typeOfGateway, 1);
        }
    }, 0);
    let sum = 0;
    for (const value of result.values()) {
        const p_i = value / numberOfGatewaysInDiagram;
        //prettier-ignore
        sum += -1 * (Math.log(p_i)/Math.log(3)) * p_i
    }
    return sum;
};

const GHObj = new Metric("GH", -1, GH, ["Gateways"],"GH: Gateway Heterogeneity, it measures the variation in gateway types");
export default GHObj;
