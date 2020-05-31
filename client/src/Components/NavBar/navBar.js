import React from "react";
import { Link } from 'react-router-dom';
import './navBar.css';
import firebase from '../../config/firebase';
import { firestore } from '../../config/firebase.js';

function NavBar() {
    const isLoggedIn = false;
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         firestore.collection("customer").doc(user.uid).get().then(doc => {
    //             console.log(doc.data());
    //             isLoggedIn = true;

    //         })
           
    //     } else {
    //         console.log("no user!")
    //         isLoggedIn = false;
    //     }
    // })
    return isLoggedIn ? 
        <div class = "navBar">
            <ul>
                
                <li><Link to="/CustomerProfile">Profile</Link></li>
                <text>Sapori Unici</text>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/reservation">Reservation</Link></li>
            </ul>
        </div>  
    :
    <div class = "navBar">
            <ul>
            <li><Link to="/login">Login</Link></li>
                <text>Sapori Unici</text>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/reservation">Reservation</Link></li>
            </ul>
        </div>
}

export default NavBar;