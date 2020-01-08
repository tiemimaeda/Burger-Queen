import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from './Button';

const styles = StyleSheet.create({
  order: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '1% 1% 3% 1%',
    backgroundColor: '#FEFFF0',
    borderRadius: '3px',
  },
  
  listItems: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  counterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: '2%',
  },

  btnCounterDel: {
    opacity: '0.8',
    border: 'none',
    borderRadius: '50%',
    fontSize: '30px',
    fontWeight:'bold',
    height: '50px',
    width: '50px',
    
      ':hover': {
        backgroundColor: '#FF9305',
        color: 'white',
      },
  },

});

function Order (props) {
  return (
    <div>
      <div className={css(styles.order)}>
        <div className={css(styles.listItems)}>
          {props.item.Name} 
          {props.item.Price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        </div>
        
        <div className={css(styles.counterContainer)}>
          <Button
            className={css(styles.btnCounterDel)}
            handleClick={(e) => {
              props.minusItem(props.item)
              e.preventDefault()
            }} title={'-'}
          />

          {props.item.count}

          <Button
            className={css(styles.btnCounterDel)}
            handleClick={(e) => {
              props.addItem(props.item)
              e.preventDefault()
            }}title={'+'}
          /> 

          <Button
            className={css(styles.btnCounterDel)}
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