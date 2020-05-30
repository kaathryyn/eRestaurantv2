import React, { useState, Component } from 'react';
import { Card, Box } from "@material-ui/core";
import firebase from '../../config/firebase';

import right_image from '../../Images/Login.jpg';
import "./CustomerProfile.css";

import { firestore } from '../../config/firebase.js';

class CustomerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""

        };
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user.email)
                firestore.collection("customer").doc(user.uid).get().then(doc => {
                    console.log(doc.data())

                })
            } else {
                console.log("no user!")
            }
        })
    }



    render() {
        return (
            <div >
                hi
            </div>


        );
    }
}

export default CustomerProfile
