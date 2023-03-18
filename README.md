# camunda-metrics-plugin
Provides a plugin for [Camunda Modeler](https://camunda.com/download/modeler/) that calculates and displays BPMN related metrics.

-- Insert Gif Here --

## Usage:
1. Download this code as zip and extract it in the resources/plugins folder of Camunda Modeler
2. Open Camunda Modeler
3. You can now see it on the bottom right and can now toggle it

## User Guide
- The plugin recalculates the metrics everytime the tab is saved,the current tab is changed or a pool was selected.
- It can be toggled to hide it
- Structural Elements on the right side can be switched order
- In the configure groups overlay, to select multiple hold ctrl and click the desired metrics, or alternatively to choose multiple metrics in a row, click on one and then click on the last one holding shift.

## Developer Guide
1. Clone this repo: ```git clone https://github.com/GeorgeFkd/camunda-metrics-plugin.git```
2. ```cd camunda-metrics-plugin```
3. ```npm run dev```

For more development related information read [Docs.md]().
