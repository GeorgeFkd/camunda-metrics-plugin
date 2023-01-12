// import React from "camunda-modeler-plugin-helpers/react";
import React from "react"
import { bpmnElementsDisplayed as bpmnElemsWithInitialOrder } from "../../assets/config";
import StatsTableTitle from "./StatsTableTitle";
import StatsTableElement from "./StatsTableElement";
import styles from "./StatsTable.css";
import { countStructuralElements } from "../../utils/metrics/utils";
import { DOMParser } from "xmldom";
import useXmlFile from "../../hooks/useXmlFile";

function StatsTable() {
    const xmlFile = useXmlFile();
    const parserRef = React.useRef(new DOMParser());
    const xmlDoc = xmlFile ? parserRef.current.parseFromString(xmlFile,"text/xml") : new Document();
    const xmlStructuralElems = countStructuralElements(xmlDoc);
    const [bpmnElementsToDisplay, setBpmnElementsToDisplay] = React.useState(
        bpmnElemsWithInitialOrder
    );
    const onDragOverElement = (e:React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    };
    const onDragStartElement = React.useCallback((e:React.DragEvent<HTMLElement>, order:number) => {
        console.log("drag start", order);
        if(e.dataTransfer===null)return;
        e.dataTransfer.setData("order", String(order));
    }, []);
    const onDropElement = React.useCallback(
        (e:React.DragEvent<HTMLElement>, oldOrder:number) => {
            //do sth
            if(e.dataTransfer === null)return;
            const newOrder = parseInt(e.dataTransfer?.getData("order"));
            console.log("to drop:", newOrder);
            console.log("to switch with", oldOrder);
            console.log("pre switch", xmlStructuralElems);
            if (!bpmnElementsToDisplay) return;
            const newElems = bpmnElementsToDisplay.map((elem) => {
                if (elem.order === newOrder)
                    return { ...elem, order: oldOrder };
                if (elem.order === oldOrder)
                    return { ...elem, order: newOrder };
                return elem;
            });
            console.log("new state", newElems);
            //console.log(newOrd)
            setBpmnElementsToDisplay(newElems);
        },
        [bpmnElementsToDisplay]
    );

    function getResult(map:Map<string,number>,key:string){
        if(!map)return -1;
        const res = map.get(key)
        if(res===undefined)return 0;
        return res;
    }

    return (
        <div className={styles.statsTableContainer}>
            <StatsTableTitle title="Structural Elements Count" />
            <div className={styles.statsTableElementsContainer}>
                {bpmnElementsToDisplay
                    .sort((a, b) => a.order - b.order)
                    .map((bpmnEl, idx) => {
                        //could make a conditional if there is icon and if there isnt
                        //0 when not defined, -1 when still loading
                        const result = getResult(xmlStructuralElems,bpmnEl.xmlTagName)
                       
                        return (
                            <React.Fragment>
                                <StatsTableElement
                                    onDragOver={(e) => onDragOverElement(e)}
                                    onDragStart={(e) =>
                                        onDragStartElement(e, bpmnEl.order)
                                    }
                                    onDrop={(e) =>
                                        onDropElement(e, bpmnEl.order)
                                    }
                                    key={`stats-table-element-${idx}`}
                                    classForBpmnIcon={bpmnEl.iconClassname}
                                    occurencesOfElementInDiagram={result}
                                />
                            </React.Fragment>
                        );
                    })}
            </div>
        </div>
    );
}

export default StatsTable;
