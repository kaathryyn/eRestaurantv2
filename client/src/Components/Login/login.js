import React, { useState, Component } from 'react';
import { Card, Box } from "@material-ui/core";
import firebase from '../../config/firebase';

import Grid from '@material-ui/core/Grid';
import right_image from '../../Images/Login.jpg';
import "./login.css";
import customerRegistrationImage from '../../Images/customer_registration.jpg';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      window.location = 'menu'
    }).catch(function (error) {
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
    // [END authwithemail]


  }



  render() {
    return (
      <Grid container direction="row"  >
        <Grid item xs={6} justify="center" alignItems="center" >
          {/* <Box className="main_box" variant="outlined"> */}
          <Card style={{ marginTop: "25%", marginLeft: "5%", marginRight: "5%", height: '100' }}>
            {/* <h1 className="loginheader"> Log in </h1> */}
            <br></br>
            <Typography variant="h4" component="h2">
              Login
        </Typography>
            <br></br><br></br>
            <Typography variant="h6" component="h2">
              Email
        </Typography>
            <input type="text" value={this.state.email}
              onChange={this.emailhandler}
              placeholder="Email"
            ></input>
            <br></br><br></br>
            <Typography variant="h6" component="h2">
              Password
        </Typography>
            {/* <input type="text" type="password" className = "login-input" value={this.state.password}
              onChange={this.passwordhandler}
              placeholder="6 digit"
            ></input> */}
            <TextField
              id="standard-password-input"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.passwordhandler}
            />
            <h6 className="forgot_password"> Forgot Password? Click here</h6>

            <button className="register_button" > Register </button>
            <button onClick={this.handleSubmit} className="login_button" > Login </button>
            {/* </Box> */}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <img style={{ width: '100%', height: '100' }} src={customerRegistrationImage} alt="customerRegistrationImage" />
        </Grid>
      </Grid>

    );
  }
}

export default Login
