import React, {useState, Component} from 'react';
import "./login.css";
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import TextField from "@material-ui/core/TextField";
//import AppBar from "@material-ui/core/AppBar";
import button from "@material-ui/core/Button";
import {Card, Box} from "@material-ui/core";
// import { auth } from '../../config/firebase.js';
import firebase from '../../config/firebase';
import right_image from '../../Images/Login.jpg';
// import Registration from '/registration'


  class Login extends Component {
    constructor(props){
      super(props);
      this.state={
      email:"",
      password:""
      
    }; 

    
      this.handleSubmit=this.handleSubmit.bind(this) //this method is used to bind the handleSubmit operation with the constructor 

  }

    emailhandler = (event) => { //gather data from the username input field 
      this.setState( { //user provides input in the heads and hit empty 
        email: event.target.value
      })
    }

    passwordhandler = (event) => { //gather input data from the password field
      this.setState( { //user provides input in the heads and hit empty 
        password: event.target.value
      })
    }

    handleSubmit = (event) => { //storing the state when the user provides data 
      event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/wrong-password') {
          alert('Wrong password.');
        } 
        else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      })
      // [END authwithemail]

    .then(() => {
      // alert('Successful Login. You will be redirected to the menu.');
      window.location='menu.js';

    })
    
    .catch(error => {
      if (error.message != null) {
          this.setState({ errorMessage: error.message });
      } else {
          this.setState({ errorMessage: null });
      }
    });
  }
  
      
    
  render() {
return (
          <div className = "wrapper">
            <Box className="main_box" variant="outlined">
              <Box className = "toggle-inactive-label"></Box>
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
                  placeholder="6 digit"
                  ></input> 
                  <h6 className="forgot_password"> Forgot Password? Click here</h6>
              </Box>
            <button className="register_button" > Register </button>
            <button onClick={this.handleSubmit} className="login_button" > Login </button>
            </Box> 
            <div className="right_image"></div>
        </div>


      );
    }
  }

export default Login
