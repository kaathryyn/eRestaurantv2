import React from "react";
import { Link } from 'react-router-dom';
import './navBar.css';

function NavBar() {
    return (
        <div class = "navBar">
            <ul>
                <li><Link to="/login">Login</Link></li>
                <text>Sapori Unici</text>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/reservation">Reservation</Link></li>
            </ul>
        </div>  
    );
}

export default NavBar;