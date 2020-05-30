import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import firebase from '../../config/firebase';

import NavBar from '../NavBar/navBar';
import Registration from '../Registration/registration';
import Login from '../Login/login';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Menu from '../Menu/menu';
import Reservation from '../Reservation/reservation';
import OrderMenu from '../orderMenu/orderMenu';
import EmailConfirmBooking from '../emailConfirmBooking/emailConfirmBooking'
import MenuInventory from '../menuInventory/menuInventory';
import StaffRegistration from '../StaffRegistration/staffRegistration';
import StaffList from '../StaffList/StaffList';
import EmailConfirmBooking from '../emailConfirmBooking/emailConfirmBooking';
import CustomerProfile from '../CustomerProfile/CustomerProfile';
import ReservationConfirmation from '../ReservationConfirmation/ReservationConfirmation';

import './App.css';

class App extends Component {
  //constructor to initialise user that is on website
  constructor() {
    super();
    this.state = {
      user: null,
      userID: null
    };
  }

  //collects a snapshot of the current data (user) and determines if changes need to made to website
  componentDidMount() {
    firebase.auth().onAuthStateChanged(webUser => {
      if (webUser) {
        this.setState({
          user: webUser,
          userID: webUser.uid
        });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(webUser => {
      webUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: webUser,
        });
      })
    })
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            {/* <Route path="/" component={Home} /> */}
            <Route path="/reservation" component={Reservation} />
            <Route path="/login" component={Login} />
            <Route path="/register" registerUser={this.registerUser} component={Registration} />
            <Route path="/registerStaff" component={StaffRegistration} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/staffList" component={StaffList} />
            <Route path="/order" component={OrderMenu} />
            <Route path="/menuInventory" component={MenuInventory} />
            <Route path="/menu" component={Menu} />
            <Route path="/confirmBooking" component={EmailConfirmBooking} />
            <Route path="/myProfile" component={CustomerProfile} />
            <Route path="/reservationConfirmation" component={ReservationConfirmation} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;