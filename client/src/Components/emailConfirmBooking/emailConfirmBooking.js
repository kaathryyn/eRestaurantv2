import React, {Component} from 'react';
import "./emailConfirmBooking.css";
import successTick from "../../Images/successTick.png"
//import { auth } from '../../config/firebase.js';

class EmailConfirmBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    handleSubmit

    render() {
        return (
        <div className = "success">
        <img src = {successTick} className="greenTick" alt = "lock"/>
        <h2>Order #12345 </h2>
        <h2>Thanks for making a reservation with us!</h2>
        <p>You'll soon receive an email from us to confirm your booking details.</p>
        <p>Please not that if you've changed your mind on your order, you can always change this by asking our staff at the store.</p>
        <button className = "homeButton" href = "home.js">Return to Home </button>
        <button className = "editBooking"> Edit Booking</button>
        </div>
       )
    }

    
}

export default EmailConfirmBooking