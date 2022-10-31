//const { registerBpmnJSPlugin } = require("camunda-modeler-plugin-helpers");

// const MetricsPlugin = require("./components/MetricsPlugin");

// const BpmnJsExtension = require("./BpmnJsExtension");
require("file-loader?name=[name].[ext]!./index.html");

import {
    registerBpmnJSPlugin,
    registerClientExtension,
} from "camunda-modeler-plugin-helpers";
import MetricsPlugin from "./components/MetricsPlugin.jsx";
import BpmnJsExtensionPlugin from "./BpmnJsExtension/index";

registerClientExtension(MetricsPlugin);
registerBpmnJSPlugin(BpmnJsExtensionPlugin);

/*things to research:
-peer dependencies
-testing along with webpack
-how i will have access to the xml and the analysis data
while it updates
[ideas:react context,props drilling,custom hook(could be a good fkcing idea)]
 */

/*TODO
-integrate metrics inside the app
-add icons instead of words(xml elements)
-na vrw olous tous typous activity
-
*/
