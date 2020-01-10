import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from './Button';

const styles = StyleSheet.create({
  btnProducts: {
    height: '90px',
    width: '140px',
    marginBottom: '8%',
    backgroundColor: '#FEFFF0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '19px',

    ':hover': {
      backgroundColor: '#FF9305',
      color: 'white',
    },
  },
})

function Menu (props) {
  return (
    <div>
        <Button
          className={css(styles.btnProducts)}
          Name={props.item.Name}
          Price={props.item.Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          handleClick={() => props.addItem(props.item)}
        />
    </div>
  )
};

export default Menu;