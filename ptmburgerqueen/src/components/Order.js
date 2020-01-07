import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from './Button';

const styles = StyleSheet.create({
  order: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '3%',
  },
  
  listItems: {
    display:'flex',
    alignItems: 'center',
    width: '50%',
    marginLeft: '2%',
  },

  btnsAndCounter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '50%',
  },

  btnAddMinus: {
    backgroundColor: 'white',
    opacity: '0.7',
    border: 'none',
    borderRadius: '50%',
    fontSize: '30px',
    fontWeight:'bold',
    height: '50px',
    width: '50px',
  },

});

function Order (props) {
  return (
    <div>
      <div className={css(styles.order)}>
        <div className={css(styles.listItems)}>
          {props.item.Name} {props.item.Price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        </div>
        
        <div className={css(styles.btnsAndCounter)}>
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
    </div>
  )
};

export default Order;