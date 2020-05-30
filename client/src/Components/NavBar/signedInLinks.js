import React from 'react';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  // const userID = firebase.auth().currentUser.uid;
  // const customerDb = firebase.firestore.collection('customer');
  // const staffDb = firebase.firestore.collection('staff');

  return (
    <ul className="signedInNavBar">
      <li><NavLink to="/myProfile">My Profile</NavLink></li>
      <li><NavLink to='/menu'>Menu</NavLink></li>
      <li><NavLink to='/order'>Order</NavLink></li>
      <li><NavLink to='/reservation'>Reservation</NavLink></li>
      <li><NavLink to='/staffList'>Staff</NavLink></li>
      <li><NavLink to='/registerStaff'>Add Staff</NavLink></li>
      <li><NavLink to='/menuInventory'> Edit Menu</NavLink></li>
    </ul>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  };
}

export default connect(null, mapDispatchToProps)(SignedInLinks);