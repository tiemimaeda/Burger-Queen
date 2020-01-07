import React from 'react';
// import Button from '../components/Button';

const OrderCard = (props) => {
  return (
    <div>
      <div>
        Mesa: {props.table}
        Cliente: {props.customer}
        Pedido: {props.order}  
        Total: {props.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
      </div>

      {/* <Button
      className={props.btnOrderReady}
      handleClick={(e) => {
        props.ready(props.item)
        e.preventDefault()
      }} title={'Pedido Pronto'}
      /> */}
    </div>
  )
};

export default OrderCard;