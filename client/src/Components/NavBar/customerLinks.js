import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomerLinks = () => {
  return (
    <ul className="customerLinks">
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to="/myProfile">My Profile</NavLink></li>
      <li><NavLink to='/menu'>Menu</NavLink></li>
      <li><NavLink to='/order'>Order</NavLink></li>
      <li><NavLink to='/reservation'>Reservation</NavLink></li>
    </ul>
  )
}

export default CustomerLinks