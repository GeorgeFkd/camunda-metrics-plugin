module.exports = function (electronApp, menuState) {
    return [
        {
            label: "Greet World",
            accelerator: "j",
            enabled: () => menuState.bpmn && menuState.platform === "platform",
            action: () =>
                console.log("A custom menu action was triggered by fcking me"),
        },
    ];
};
