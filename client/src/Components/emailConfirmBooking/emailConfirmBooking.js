import React, {Component} from 'react';
import "./emailConfirmBooking.css";
import successTick from "../../Images/successTick.png"
import { auth } from '../../config/firebase.js';
import firebase from 'firebase';

class EmailConfirmBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.handleHomePage = this.handleHomePage.bind(this); //method used to bind the handleSubmit operation with the constructor - setting up the handle change method 
        this.handleEditBooking = this.handleEditBooking.bind(this);
    }

    handleEmailConfirmation(e) {
        e.preventDefault();
        firebase.auth().doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification( {
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });
    }
    handleHomePage(e) {
        e.preventDefault();
        window.location = 'home';

    }

    handleEditBooking (e) {
        e.preventDefault();
        window.location = 'reservation';
    }


    render() {
        return (
        <div className = "success">
        <img src = {successTick} className="greenTick" alt = "lock"/>
        <h2>Order #12345 </h2>
        <h2>Thanks for making a reservation with us!</h2>
        <p>You'll soon receive an email from us to confirm your booking details.</p>
        <p>Please not that if you've changed your mind on your order, you can always change this by asking our staff at the store.</p>
        <button className = "homeButton" onClick = {this.handleHomePage}> Return to Home </button>
        <button className = "emailConfirmation" onClick = {this.handleEmailConfirmation}> Send Email Confirmation</button>
        <button className = "editBooking" onClick = {this.handleEditBooking}> Edit Booking</button>
        </div>
       )
    }

    
}

export default EmailConfirmBooking