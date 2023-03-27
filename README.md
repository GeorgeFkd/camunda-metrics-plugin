# Camunda-BPME-Plugin
Provides a plugin for [Camunda Modeler](https://camunda.com/download/modeler/) that calculates and displays BPMN related metrics.

![ezgif-3-02ee879256](https://user-images.githubusercontent.com/69716466/226136467-89fd7d6c-9a44-4750-93f0-e8427c0d8f50.gif)


## Usage: [A more detailed step by step guide](#detailed-installation-guide)
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
For more development related information read [Docs.md](https://github.com/GeorgeFkd/camunda-metrics-plugin/blob/master/Docs.md).

## Detailed Installation Guide
First the plugin must be downloaded, click on code and Download ZIP.
![step-1](https://user-images.githubusercontent.com/69716466/227921707-326c6ea1-50f7-4f25-9946-8e375e271b0f.jpg)

Then the .zip file must be extracted in the correct place.To find it, right click the Camunda Modeler App and click "Open File Location"(in Windows 10 the process is similar).
![step-2](https://user-images.githubusercontent.com/69716466/227922787-59e973dc-4ab7-428e-be06-a9025c5297d5.jpg)

The folder will look something like this:
![step-3](https://user-images.githubusercontent.com/69716466/227923072-ea6d3fcc-bb2e-4792-a0c0-a826f535beb2.jpg)

Click on the resources folder and then in the plugins folder.
![step-4](https://user-images.githubusercontent.com/69716466/227923343-b196b6d8-c348-437d-871e-f3e91faaff5a.jpg)

Extract the file inside the plugins folder:
![step-5](https://user-images.githubusercontent.com/69716466/227923488-74d26617-6079-4177-9558-8ebc86391b32.jpg)

Now you are ready, you will need to restart the Camunda Modeler App and if you followed the steps successfully you will be able to see the Metrics Button on the bottom right side. Watch the [video](#camunda-bpme-plugin) above and consult the [user guide](#user-guide) to use it productively. Cheers!

