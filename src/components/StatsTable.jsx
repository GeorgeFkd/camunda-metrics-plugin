import React from 'react'

function StatsTable({elementsToKeep,data,removeElement}) {
  return (
   <div className="elements-table-container">
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
                                {data.get(bpmnEl) ? data.get(bpmnEl): 0}
                                </span>
                            </div>
                            {/* TODO na valw icon edw */}
                            <button
                                className="remove-element-button"
                                onClick={() => removeElement(bpmnEl)}
                            >
                                X
                            </button>
                            {/* it works <span className="bpmn-icon-gateway-or"></span> */}
                        </div>
                    );
                })}
            </div>
  )
}

export default StatsTable