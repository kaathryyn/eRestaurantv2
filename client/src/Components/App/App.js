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

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Menu} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/reservation" component={Reservation} />
        <Route exact path="/contactUs" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    );
  }
}

export default App;