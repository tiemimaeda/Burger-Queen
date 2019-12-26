import React from 'react';
import Button from '../components/Button';

function Menu (props) {
  return (
    <div key={props.item.id}>
        <Button
          Name={props.item.Name}
          Price={props.item.Price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
          handleClick={() => props.createOrder(props.item)}
        />
    </div>
  )
};

export default Menu;