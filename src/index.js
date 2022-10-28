//const { registerBpmnJSPlugin } = require("camunda-modeler-plugin-helpers");

// const MetricsPlugin = require("./components/MetricsPlugin");

// const BpmnJsExtension = require("./BpmnJsExtension");
require("file-loader?name=[name].[ext]!./index.html");

import {
    registerBpmnJSPlugin,
    registerClientExtension,
} from "camunda-modeler-plugin-helpers";
import MetricsPlugin from "./components/MetricsPlugin";
import BpmnJsExtensionPlugin from "./BpmnJsExtension/index";

registerClientExtension(MetricsPlugin);
registerBpmnJSPlugin(BpmnJsExtensionPlugin);
