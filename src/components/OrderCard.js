import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
  },

  tableCustomer: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  strong: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2%',
  },

});

const OrderCard = (props) => {
  return (
    <div className={css(styles.cardStyle)}>
      <div className={css(styles.tableCustomer)}>
        <div className={css(styles.strong)}> Mesa: {props.table} </div>
        <div className={css(styles.strong)}> Cliente: {props.customer} </div>
      </div>
      <span className={css(styles.strong)}>{props.sendTime} </span>
      {props.order}
      {props.total}
    </div>
  )
};

export default OrderCard;