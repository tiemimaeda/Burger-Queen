import React from 'react';
import { StyleSheet, css} from 'aphrodite';
import Button from '../components/Button';

function Menu (props) {
  return (
    <div key={props.item.id}>
        <Button
          className={css(styles.btnProducts)}
          Name={props.item.Name}
          Price={props.item.Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          handleClick={() => props.createOrder(props.item)}
        />
    </div>
  )
};

export default Menu;

const styles = StyleSheet.create({
  btnProducts: {
    height: '65px',
    width: '120px',
    marginBottom: '2%',
    backgroundColor: 'FBFFFE',
    borderRadius: '6px',
  },

  
})