import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from '../components/Button';

const styles = StyleSheet.create({ 
  ordercard: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    margin: '2%',
    padding: '2%',
    backgroundColor: '#FFFDE0',
    borderRadius: '5px',
  },

  btnOrderReady: {
    margin: '3% 0 3% 0',
    width: '120px',
    height:'30px',
    backgroundColor:'green',
    borderRadius:'5px',
    border:'none',
    color: 'white',
    fontSize:'15px',
    fontWeight:'bold',
  }
});

const OrderCard = (props) => {
  return (
    <div className={css(styles.ordercard)}>
      Mesa: {props.table}
      Cliente: {props.customer}
      Pedido: {props.order}  
      {props.total}

      <Button
      className={css(styles.btnOrderReady)}
      // handleClick={(e) => {
      //   props.ready(props.item)
      //   e.preventDefault()
      // }} 
      title={'Pedido Pronto'}
      />
    </div>
  )
};

export default OrderCard;