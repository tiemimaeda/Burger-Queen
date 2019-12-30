import React from 'react';

const Button = (props) => {
  return (
    <button
      className={props.className} onClick={props.handleClick}>
      {props.title}
      {props.Name} {props.Price}
    </button>
  )
}

export default Button;