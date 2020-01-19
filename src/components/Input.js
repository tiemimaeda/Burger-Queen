import React from 'react';

function Input(props) {
  return (
    <div className={props.class}>
      <label>{props.label}</label>
      <input
        className={props.className}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.holder}
      />
    </div>
  )
}
  
export default Input;