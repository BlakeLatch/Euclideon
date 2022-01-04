import React from 'react'
// import './Input.css';

const Input = (props)=>{
    return <div>
       <input className="inputType" name={props.name} type={props.type} placeholder={props.placeholder} onChange = {props.onChange}/>
    </div>

}
export default Input