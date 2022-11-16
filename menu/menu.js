module.exports = function (electronApp, menuState) {
    return [
        {
            label: "Configure Categories",
            accelerator: "j",
            enabled: () => menuState.bpmn && menuState.platform === "platform",
            action: function () {},
        },
    ];
};
