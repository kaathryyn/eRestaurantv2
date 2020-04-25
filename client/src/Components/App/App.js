import React, {Component} from 'react';
// eslint-disable-next-line
import { Route, Link } from 'react-router-dom';

import './App.css';
import NavBar from '../NavBar/navBar';
import Menu from '../Menu/menu';
import Order from '../Order/order';
import Reservation from '../Reservation/reservation';
import Contact from '../Contact/contact';
import Login from '../Login/login';
import Register from '../Registration/registration';
import GenerateStaffLogin from '../GenerateStaffLogin/GenerateStaffLogin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Menu} />
        <Route path="/order" component={Order} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/contactUs" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/GenerateStaffLogin" component = {GenerateStaffLogin} />
      </div>
    );
  }
}

export default App;