import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../../store/actions/authActions.js';

import "./login.css";
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import TextField from "@material-ui/core/TextField";
//import AppBar from "@material-ui/core/AppBar";
import button from "@material-ui/core/Button";
import { Card, Box } from "@material-ui/core";
// import { auth } from '../../config/firebase.js';
import firebase from '../../config/firebase';
import right_image from '../../Images/Login.jpg';
// import Registration from '/registration'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""

    };


    this.handleSubmit = this.handleSubmit.bind(this) //this method is used to bind the handleSubmit operation with the constructor 

  }

  emailhandler = (event) => { //gather data from the username input field 
    this.setState({ //user provides input in the heads and hit empty 
      email: event.target.value
    })
  }

  passwordhandler = (event) => { //gather input data from the password field
    this.setState({ //user provides input in the heads and hit empty 
      password: event.target.value
    })
  }

  handleSubmit = (event) => { //storing the state when the user provides data 
    event.preventDefault();
    // this.props.logIn(this.state);

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      window.location = 'menu';
    })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/wrong-password') {
          alert('Wrong password.');
          window.location = 'login';
        }
        else {
          alert(errorMessage);
          window.location = 'login';
        }
        console.log(error);
        // [END_EXCLUDE]
      })
  }

  render() {
    const { authError } = this.props;

    return (
      <div className="wrapper">
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <Box className="main_box" variant="outlined">
            <Box className="toggle-inactive-label"></Box>
            <h1 className="loginheader"> Log in </h1>
            <Box className="details_box" variant="outlined">
              <h2 className="email"> Email </h2>
              <input type="text" value={this.state.email}
                onChange={this.emailhandler}
                placeholder="Email"
              ></input>
              <h2 className="password"> Password </h2>
              <input type="password" value={this.state.password}
                onChange={this.passwordhandler}
                placeholder="6 digit" />
              <h6 className="forgot_password"> Forgot Password? Click here</h6>
            </Box>
            <div className="authError">
              {authError ? <p>{authError}</p> : null}
            </div>
            <button type="submit" className="login_button" > Login </button>
            <Link to='/register' className="register_button"> Register </Link>
          </Box>
          <div className="right_image" />
        </form>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (creds) => dispatch(logIn(creds))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
