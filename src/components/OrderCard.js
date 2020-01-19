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
    justifyContent: 'space-between',
    marginBottom: '4%'
  },

  strong: {
    fontWeight: 'bold',
  },

});

const OrderCard = (props) => {
  return (
    <div className={css(styles.cardStyle)}>
      <div className={css(styles.tableCustomer)}>
        <div className={css(styles.strong)}> Mesa: {props.table} </div>
        <div className={css(styles.strong)}> Cliente: {props.customer} </div>
        {props.sendTime}
      </div>
      {props.order}
      {props.total}
    </div>
  )
};

export default OrderCard;