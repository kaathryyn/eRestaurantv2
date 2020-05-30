import React, { Component } from 'react';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';

import CustomerLinks from './customerLinks';
import StaffLinks from './staffLinks';


class SignedInLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userType: ''
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.email);
        this.setState({
          user: user
        });
      }      
    })
  }

  render() {

    var userID = firebase.auth().currentUser.uid;
    console.log(userID);
    var customerRole = firebase.firestore().collection("customer").doc(userID).get().then((onValue) => {
      onValue.exists ? this.setState({userType: 'customer'}): this.setState({userType: 'staff'})
    });

    var links = null;

    if (this.state.userType.includes('customer')) {
      links = <CustomerLinks />
    } else {
      links = <StaffLinks />
    }


    return (
      <ul className="signedInNavBar">
        <text className="resTitle">Sapori Unici</text>
        {links}
      </ul>
    );
  }
}

export default SignedInLinks;