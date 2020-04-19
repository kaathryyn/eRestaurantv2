import React from "react";
import './navBar.css';

function NavBar() {
    return (
        <div class = "navBar">
            <ul>
                <li><a href="/login">Login</a></li>
                <text>Sapori Unici</text>
                <li><a href="/">Menu</a></li>
                <li><a href="/order">Order</a></li>
                <li><a href="/reservation">Reservation</a></li>
            </ul>
        </div>  
    );
}

export default NavBar;