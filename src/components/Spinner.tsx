import React from "camunda-modeler-plugin-helpers/react";
import spinner from "./Spinner.css";

export const Spinner = () => {
    return (
        <div className={spinner.container}>
            <div className={spinner.spin}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
    );
};
