import React from 'react';
import { Link } from "react-router-dom";

function Header () {
  return (
    <nav >
      <ul>
        <li>
          <Link to="/floor">Salão</Link>
        </li>
        <li>
          <Link to="/kitchen">Cozinha</Link>
        </li>
      </ul>
    </nav>

  );
};
  
export default Header

