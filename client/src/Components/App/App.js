import React, {Component} from 'react';
// eslint-disable-next-line
import { Route, Link } from 'react-router-dom';
import firebase from '../../config/firebase';

import './App.css';
import NavBar from '../NavBar/navBar';
import Menu from '../Menu/menu';
import Order from '../Order/order';
import Reservation from '../Reservation/reservation';
import Contact from '../Contact/contact';
import Login from '../Login/login';
import Register from '../Registration/registration';

class App extends Component {
  //constructor to initialise user that is on website
  constructor() {
    super();
    this.state = {
      user: null
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