import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  styleLogo: {
    maxWidth: '40%',
    height: 'auto',
  },
  
  ul: {
    listStyleType: 'none',
    height: '60px',
    overflow: 'hidden',
    backgroundColor: '#212121',
  },
  
  navItem: {
    float: 'left',
    display: 'block',
    padding: '14px 16px',
    fontSize: '24px',
    fontWeight: 'bold',
    borderLeft: '1px solid #bbb',
    borderLeftColor: 'white',
    textAlign: 'center',

      ':hover': {
        backgroundColor: '#287377',
      },
  },

  link: {
    textDecoration: 'none',
    color: 'white',
  }

})

function Navbar () {
  return (
      <header className={css(styles.header)}>
        <img className={css(styles.styleLogo)} src="/images/BQlogo.png" alt="Logotipo" />
        <nav>
          <ul className={css(styles.ul)}>
            <li className={css(styles.navItem)}>
              <Link className={css(styles.link)} to="/">Salão</Link>
            </li>
            <li className={css(styles.navItem)}>
              <Link className={css(styles.link)} to="/kitchen">Cozinha</Link>
            </li>
            <li className={css(styles.navItem)}>
              <Link className={css(styles.link)} to="/waiter">Pedidos</Link>
            </li>
          </ul>
        </nav>
    </header>
  );
};
  
export default Navbar;