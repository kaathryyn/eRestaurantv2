import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from '../../config/firebase';
import './App.css';
import NavBar from '../NavBar/navBar';
import Menu from '../Menu/menu';
import CreateReservation from '../createReservation/createReservation';
import Login from '../Login/login';
import Registration from '../Registration/registration';
import OrderMenu from '../orderMenu/orderMenu';
import MenuInventory from '../menuInventory/menuInventory';
import StaffRegistration from '../StaffRegistration/staffRegistration';
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
        <Route path="/menu" component={Menu} /> {/*This path is the home of our website */}
        <Route path="/login" component={Login} />
        <Route path="/registration" registerUser={this.registerUser} component={Registration} />
        
        <Route path="/reservation" component={CreateReservation} />
        <Route path="/order" component={OrderMenu} />
        <Route path="/confirmBooking" component={EmailConfirmBooking} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        
        <Route path="/staffList" component={StaffList} />
        <Route path="/menuInventory" component={MenuInventory} />
        <Route path="/registerStaff" component={StaffRegistration} />
      </div>
    );
  }
}

export default App;