//all functions exported here will take the xml elements count data and use that
//somehow get a variable with the platform in all utils in case i have to do compatibility with both

//genika paizei na mporousa apla na vrw enan tropo na einai mia synarthsh pou ths pernas ena function sto opoio
//na vasizetai to calculation

export function numberOfActivitiesMetric(data) {
    //this one is tricky because of camunda 7/8
    //kai otan allazei tab na ananewnei ta data
    //sgr context provider gia ta data
    //ok pairnoume ta data
    console.log("kowalski ti paizei edw re magka", data);
    const allTypesOfTasks = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.toLowerCase().endsWith("task");
    });

    //ta subprocesses metrane sa task h oxi? gt ena mpainei panw kai ena otan to kaneis expand
    //epishs ta callActivity einai diaforetika
    const result = allTypesOfTasks.reduce((total, value) => {
        return (total += data.get(value));
    }, 0);
    console.log("tasks at hand", result);

    return result;
}

export function numberOfEvents(data) {
    console.log("kowalski ti paizei edw re magka", data);
    const allTypesOfEvents = Array.from(data.keys()).filter((bpmnElement) => {
        return bpmnElement.toLowerCase().endsWith("event");
    });

    const result = allTypesOfEvents.reduce((total, value) => {
        return (total += data.get(value));
    }, 0);

    console.log("events at hand", result);
    return result;
}
