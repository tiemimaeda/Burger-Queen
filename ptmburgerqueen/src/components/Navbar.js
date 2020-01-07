import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    height: '60px',
    overflow: 'hidden',
    backgroundColor: '#212121',
    textDecorationUnderline: 'none'
  },
  
  navItem: {
    float: 'right',
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
    <nav>
      <ul className={css(styles.ul)}>
        <li className={css(styles.navItem)}>
          <Link className={css(styles.link)} to="/">Salão</Link>
        </li>
        <li className={css(styles.navItem)}>
          <Link className={css(styles.link)} to="/kitchen">Cozinha</Link>
        </li>
      </ul>
    </nav>

  );
};
  
export default Navbar;