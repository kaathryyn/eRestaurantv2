import React from 'react';
// eslint-disable-next-line
import { Route, Link } from 'react-router-dom';
import './App.css';
import Header from '../Header/header';
import NavBar from '../NavBar/navBar';
import Home from '../Home/home';
import Menu from '../Menu/menu';
import Order from '../Order/order';
import Booking from '../Booking/booking';
import Contact from '../Contact/contact';
import Login from '../Login/login';
import Register from '../Registration/registration';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Route exact path="/" component={Home}/>;
      <Route exact path="/menu" component={Menu}/>;
      <Route exact path="/order" component={Order}/>;
      <Route exact path="/booking" component={Booking}/>;
      <Route exact path="/contactUs" component={Contact}/>;
      <Route exact path="/login" component={Login}/>;
      <Route exact path="/register" component={Register}/>;
    </div>
  );
}

export default App;