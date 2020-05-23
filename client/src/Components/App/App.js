import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from '../../config/firebase';

import './App.css';
import NavBar from '../NavBar/navBar';
import Menu from '../Menu/menu';
import Order from '../Order/order';
import Reservation from '../Reservation/reservation';
import Login from '../Login/login';
import Registration from '../Registration/registration';
import Register from '../Registration/registration';
import OrderMenu from '../orderMenu/orderMenu';
import StaffRegistration from '../StaffRegistration/staffRegistration';
import GenerateStaffLogin from '../GenerateStaffLogin/GenerateStaffLogin';
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import StaffList from '../StaffList/StaffList';


class App extends Component {
  //constructor to initialise user that is on website
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  //collects a snapshot of the current data (user) and determines if changes need to made to website
  componentDidMount() {
    const ref = firebase.database().ref('user');

    ref.on('value', snapshot => {
      let FBUser = snapshot.val();
      this.setState({ user: FBUser });
    })
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(()=>{
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName, 
          userID: FBUser.uid
        });
      })

    })
  }

  render() {
    return (
      <div className="App">

        <NavBar/>

        <Route path="/order" component={Order} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/login" component={Login} />
        <Route path="/registration" registerUser={this.registerUser} component={Registration}  />
        <Route path="/registerStaff" component={StaffRegistration} />
        <Route path="/GenerateStaffLogin" component = {GenerateStaffLogin} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/staffList" component={StaffList} />
        <Route path="/orderMenu" component={OrderMenu} />
      </div>
    );
  }
}

export default App;