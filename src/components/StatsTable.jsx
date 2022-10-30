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
                            <span className="element-name">{bpmnEl}</span>
                            <span className="element-count">
                                {data.get(bpmnEl)}
                            </span>
                            <button
                                className="remove-element"
                                onClick={() => removeElement(bpmnEl)}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
  )
}

export default StatsTable