import React from 'react';
import { NavLink } from 'react-router-dom';
import Home from '../Home/home';

function SignedOutLinks() {
  return (
    <ul className="signedOutNavBar">
      <text className="resTitle">Sapori Unici</text>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/menu'>Menu</NavLink></li>
      <li><NavLink to='/login'>Login</NavLink></li>
      <li><NavLink to='/register'>Register</NavLink></li>
    </ul>
  );
}

export default SignedOutLinks;