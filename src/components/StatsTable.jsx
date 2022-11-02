import React from "react";
import testRunner from "../utils/testMetrics";
function StatsTable({ elementsToKeep, data }) {
    React.useEffect(() => {
        testRunner();
    }, []);

    return (
        <div className="stats-table-container">
            <StatsTableTitle title="Structural Elements Count" />
            {elementsToKeep.map((bpmnEl, idx) => {
                return (
                    <div
                        key={`removed-elems-${idx}`}
                        className="element-component"
                    >
                        {/* edw sto mellon tha mporouse na mpei icon */}
                        <div className="element-display">
                            <span className="element-name">{bpmnEl}:</span>
                            <span className="element-count">
                                {/* an kati den yparxei kan na to vgazei 0 */}
                                {data.get(bpmnEl) ? data.get(bpmnEl) : 0}
                            </span>
                        </div>
                        {/* TODO na valw icon edw */}
                        {/* <button
                            className="remove-element-button"
                            onClick={() => removeElement(bpmnEl)}
                        >
                            X
                        </button> */}
                        {/* it works <span className="bpmn-icon-gateway-or"></span> */}
                    </div>
                );
            })}
        </div>
    );
}

function StatsTableTitle({ title }) {
    return (
        <div className="stats-table-title-container">
            <span className="stats-table-title">{title}</span>
        </div>
    );
}

export default StatsTable;
