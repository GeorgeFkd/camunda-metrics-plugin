import React from 'react'

interface ISelectSubprocessButtonProps{
    onClick:(event:React.MouseEvent<HTMLButtonElement>)=>void;
}

function SelectSubprocessButton({onClick}:ISelectSubprocessButtonProps) {

    
  return (
    <button className='btn btn-primary' onClick={onClick}>Select Subprocess</button>
  )
}

export default SelectSubprocessButton