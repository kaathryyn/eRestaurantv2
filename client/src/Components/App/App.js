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
import MenuInventory from '../menuInventory/menuInventory';
import StaffRegistration from '../StaffRegistration/staffRegistration';
import GenerateStaffLogin from '../GenerateStaffLogin/GenerateStaffLogin';
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import StaffList from '../StaffList/StaffList';
import EmailConfirmBooking from '../emailConfirmBooking/emailConfirmBooking'


class App extends Component {
  //constructor to initialise user that is on website
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  //collects a snapshot of the current data (user) and determines if changes need to made to website
  componentDidMount() {
    const ref = firebase.database().ref('user');

    ref.on('value', snapshot => {
      let webUser = snapshot.val();
      this.setState({ user: webUser });
    })
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(webUser => {
      webUser.updateProfile({
        displayName: userName
      }).then(()=>{
        this.setState({
          user: webUser,
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
        <Route path="/register" registerUser={this.registerUser} component={Registration}  />
        <Route path="/registerStaff" component={StaffRegistration} />
        <Route path="/GenerateStaffLogin" component = {GenerateStaffLogin} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/staffList" component={StaffList} />
        <Route path="/orderMenu" component={OrderMenu} />
        <Route path="/menuInventory" component={MenuInventory} />
        <Route path="/menu" component={Menu} />
        <Route path="/confirmBooking" component={EmailConfirmBooking}/>
      </div>
    );
  }
}

export default App;