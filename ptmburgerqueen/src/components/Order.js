import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from './Button';

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
});

function Order (props) {
  return (
    <div key={props.item.id}>
      <div className={css(styles.order)}>
        <span>{props.item.Name}</span>
        {props.item.Price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        
        <Button
          className={css(styles.btnAddMinus)}
          handleClick={(e) => {
            props.minusItem(props.item)
            e.preventDefault()
          }} title={'-'}
        />

        {props.item.count}

        <Button
          className={css(styles.btnAddMinus)}
          handleClick={(e) => {
            props.addItem(props.item)
            e.preventDefault()
          }}title={'+'}
        /> 

        <Button
          className={css(styles.btnAddMinus)}
          handleClick={(e) => {
            props.removeItem(props.item)
            e.preventDefault()
          }}title={'🗑'}
        />     
      </div>
    </div>
  )
};

export default Order;