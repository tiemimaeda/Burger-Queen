import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from './Button';

function Order (props) {
  return (
    <div key={props.item.id}>
      <div className={css(styles.order)}>
        <span>{props.item.Name}</span>
        {props.item.Price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        
        <Button
          className={css(styles.btnAddMinus)}
          handleClick={() =>
            props.minusItem(props.item)}
          title={'-'}
        />

        {props.item.count}

        <Button
          className={css(styles.btnAddMinus)}
          handleClick={() =>
            props.addItem(props.item)}
          title={'+'}
        /> 

        <Button
          className={css(styles.btnAddMinus)}
          handleClick={() =>
            props.removeItem(props.item)}
          title={'🗑'}
        />     
      </div>
    </div>
  )
};

export default Order;

const styles = StyleSheet.create({
  btnAddMinus: {
    fontWeight:'bolder',
    height: '30px',
    width: '30px',
  },
  order:{
    display:"flex",
    justifyContent: 'space-between',
  }
})
