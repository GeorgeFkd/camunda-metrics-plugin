export default function ExampleBpmnJsExtension(eventBus, viewer) {
    eventBus.on("saveXML.start", function (context) {
        console.log(context.definitions.diagrams);
    });
    // eventBus.on("connection.added", function (context) {
    //     var element = context.element;
    //     console.log("BABABABABABAB", element);
    // });
}

ExampleBpmnJsExtension.$inject = ["eventBus"];
