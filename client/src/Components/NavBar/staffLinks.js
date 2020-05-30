import React, { Component} from 'react';
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
      window.location = 'menu';
    })
  }

  render() {
    return (
      <ul className="staffLinks">
        <li><button class="staffLogOut" onClick={this.signOut}>Log Out</button></li>
        <li><NavLink to='/staffList'>Staff</NavLink></li>
        <li><NavLink to='/registerStaff'>Add Staff</NavLink></li>
        <li><NavLink to='/menuInventory'> Edit Menu</NavLink></li>
      </ul>
    )
  }
}

export default StaffLinks;
