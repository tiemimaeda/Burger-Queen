import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  navItem: {
    listStyle: 'none',
    display: 'inline',
    marginRight: '15px',
  },
})

function Navbar () {
  return (
    <nav>
      <ul>
        <li className={css(styles.navItem)}>
          <Link to="/floor">Salão</Link>
        </li>
        <li className={css(styles.navItem)}>
          <Link to="/kitchen">Cozinha</Link>
        </li>
      </ul>
    </nav>

  );
};
  
export default Navbar;