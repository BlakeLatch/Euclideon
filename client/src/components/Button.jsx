import React from 'react'

const Button = (props) =>{
    return <button className="buttonType" type = {props.type} onClick={props.onClick}> {props.text} </button>
}
export default Button