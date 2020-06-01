import React, { Component } from 'react';
import firebase from '../../config/firebase'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class StaffLinks extends Component {
  constructor(props) {
    super(props);
  }

  signOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      console.log("user signed out");
      window.location = '/'
    })
  }

  render() {
    return (
      <ul className="staffLinks">
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Menu</NavLink></li>
        <li><NavLink to='/staffReservation'>Reservations</NavLink></li>
        <li><NavLink to='/staffList'>Staff List</NavLink></li>
        <li><NavLink to='/menuInventory'> Edit Menu</NavLink></li>
        <li><a onClick={this.signOut}>Log Out</a></li>
      </ul>
    )
  }
}

export default StaffLinks;