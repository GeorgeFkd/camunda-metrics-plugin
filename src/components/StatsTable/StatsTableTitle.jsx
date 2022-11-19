import React from "camunda-modeler-plugin-helpers/react";

export default function StatsTableTitle({ title }) {
    return (
        <div className="stats-table-title-container">
            <span className="stats-table-title">{title}</span>
        </div>
    );
}
