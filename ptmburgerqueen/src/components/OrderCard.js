import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from '../components/Button';

const styles = StyleSheet.create({ 
  ordercard: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '2%',
    backgroundColor: '#FFFDE0',
    borderRadius: '5px',

  }
});

const OrderCard = (props) => {
  return (
    <div className={css(styles.ordercard)}>
        <div>
          Mesa: {props.table}
          Cliente: {props.customer}
        </div>
        Pedido: {props.order}  
        Total: {props.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}

      <Button
      className={props.btnOrderReady}
      handleClick={(e) => {
        props.ready(props.item)
        e.preventDefault()
      }} title={'Pedido Pronto'}
      />
    </div>
  )
};

export default OrderCard;