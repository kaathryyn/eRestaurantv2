import React from "react";
import './navBar.css';

function NavBar() {
    return (
        <div class = "navBar">
            <a class="active" href="/">Home</a>
            <a class="active" href="/Menu">Menu</a>
            <a class="active" href="/order">Order Now</a>
            <a class="active" href="/booking">Make a Booking</a>
            <a class="active" href="/contactUs">Contact Us</a>
            <a class="login" href ="/login">Login</a>
            <a class="register" href="/register">Join Us!</a>
        </div>  
    );
}

export default NavBar;