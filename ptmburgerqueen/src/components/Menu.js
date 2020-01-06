import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from '../components/Button';

const styles = StyleSheet.create({
  btnProducts: {
    height: '65px',
    width: '120px',
    marginBottom: '2%',
    backgroundColor: '#FFF9C7',
    border: 'none',
    borderRadius: '6px',

    ':hover': {
      backgroundColor: '#FF9305',
      color: 'white',
    },
  },
})

function Menu (props) {
  return (
    <div key={props.item.id}>
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