declare module "camunda-modeler-plugin-helpers";
declare module "camunda-modeler-plugin-helpers/react";
declare module "camunda-modeler-plugin-helpers/components";

declare module "*.css" {
    const content: Record<string, string>;
    export default content;
}
