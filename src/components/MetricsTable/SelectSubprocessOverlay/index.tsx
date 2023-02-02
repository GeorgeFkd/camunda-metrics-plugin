import React from 'react'
import { Overlay, Section } from "camunda-modeler-plugin-helpers/components";

interface ISelectSubProcessOverlayProps{
    anchor: HTMLElement | HTMLButtonElement | null;
    onClose:()=>void;
    onSubmit:(processRef:string)=>void;
    options:any[]
    //{name:string,processRef:string}
}

function SelectSubProcessOverlay({anchor,onClose,onSubmit,options}:ISelectSubProcessOverlayProps) {
  return (
    <Overlay anchor={anchor} onClose={onClose}>
        <Overlay.Title>Choose Process to calculate Metrics</Overlay.Title>
        <Overlay.Body>
            {options.map(option=><button onClick={(e)=>onSubmit(option.processRef)}>{option.name}---{option.processRef}</button>)}
        </Overlay.Body>
        <button onClick={onClose}>Close</button>
    </Overlay>
  )
}

export default SelectSubProcessOverlay