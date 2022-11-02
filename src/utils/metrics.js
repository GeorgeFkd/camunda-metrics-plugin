//all functions exported here will take the xml elements count data and use that
//somehow get a variable with the platform in all utils in case i have to do compatibility with both

//genika paizei na mporousa apla na vrw enan tropo na einai mia synarthsh pou ths pernas ena function sto opoio
//na vasizetai to calculation

export function numberOfActivitiesMetric(data) {
    //activites einai pragmata pou ginontai
    //subclasses einai ta tasks ta processes kai ta subprocesses
    //this one is tricky because of camunda 7/8
    //kai otan allazei tab na ananewnei ta data
    //sgr context provider gia ta data
    //ok pairnoume ta data
    if (!data) throw Error("No data given to calculate metric");
    console.info("In NoA with data:", data);
    //const array = ['callActivity' etc.] kapoia einai activities
    //alla den einai tasks strictly definitionally
    const allTypesOfTasks = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.toLowerCase().endsWith("task");
    });

    //ta subprocesses metrane sa task h oxi? gt ena mpainei panw kai ena otan to kaneis expand
    //epishs ta callActivity einai diaforetika
    //prepei na ta kanw include
    const result = allTypesOfTasks.reduce((total, value) => {
        return (total += data.get(value));
    }, 0);
    console.info("Actvities counted: ", result);

    return result;
}

export function numberOfEvents(data) {
    if (!data) throw Error("No data given to calculate metric");

    console.info("In TNE with data", data);
    const allTypesOfEvents = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.toLowerCase().endsWith("event");
    });

    const result = allTypesOfEvents.reduce((total, value) => {
        return (total += data.get(value));
    }, 0);

    console.info("events counted: ", result);
    return result;
}

export function numberOfEndEvents(data) {
    if (!data) throw Error("No data given to calculate metric");

    console.info("In TNEE with data: ", data);
    return data.get("endEvent");
    //prosoxh otan exoun types ta end events einai endEvent
    //tag pou exei mesa ena definition
    //prosoxh kai ta intermediateCatch events kanoun to idio pragma
    //me xpath sigoura ginetai kapws to lookup
}

export function numberOfStartEvents(data) {
    if (!data) throw Error("No data given to calculate metric");

    console.info("In TNSE with data: ", data);
    return data.get("startEvent");

    //apla to startEvent element metrhma
}

export function numberOfGateways(data) {
    //metrima ta elements pou einai ths morfhs _____Gateway
    const allGateways = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.endsWith("Gateway");
    });
    console.log(allGateways);
    const result = allGateways.reduce((total, curr) => {
        return (total += data.get(curr));
    }, 0);
    return result;
}
export function numberOfGatewayTypes(data) {
    console.log(data);
    const allTypesOfGateways = new Set(
        Array.from(data.keys()).filter((bpmnElement) => {
            return bpmnElement.endsWith("Gateway");
        })
    );
    console.log(allTypesOfGateways.size);
    return allTypesOfGateways.size;
}

export function numberOfSplits(data) {
    //? how is this counted exactly
}

export function numberOfJoins(data) {
    //? also how is this counted
}

//link events are considered intermediate throw events with
//a definition inside
