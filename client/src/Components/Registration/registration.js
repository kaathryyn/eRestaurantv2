import React, { Component } from 'react';
import firebase from '../../config/firebase';
import { Grid, FormControl, Button, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import './registration.css';
import customerRegistrationImage from '../../Images/customer_registration.jpg';

class Registration extends Component {
  constructor(props) {
    super(props); // pass properties to the parent constructor

    this.state = { //state where the values given by the users is being stored - this is the initial value 
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      errorMessage: null,
      emailError: null 
    };

    this.handleChange = this.handleChange.bind(this); //method used to bind the handleSubmit operation with the constructor - setting up the handle change method 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  //storing the state when the user provides data  
  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.emailAddress, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } 
      else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
      })
    .then(cred => {
      const customerDb = firebase.firestore();
      return customerDb.collection("customer").doc(cred.user.uid).set(
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          emailAddress: this.state.emailAddress,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        });
    }).
    then(() => {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ errorMessage: 'Passwords do not match' })
      }
      else {
        this.setState({ errorMessage: null });
      }
    }).
    then(() => {
      alert('Registration Successful! Please Log in to start booking.');
      window.location='login';
    }).
    catch(error => {
      if (error.message != null) {
          this.setState({ errorMessage: error.message });
      } else {
          this.setState({ errorMessage: null });
      }
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs zeroMinWidth >
          <img style={{ width: '100%' }} src={customerRegistrationImage} alt="customerRegistrationImage" />
        </Grid>

        <Grid item xs>
          <form class="customerRegistrationForm" onSubmit={this.handleSubmit}>
            <FormControl>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Typography variant="h4" component="h2">
                    Registration<br></br>
                  </Typography>


                </Grid>
                <Grid item>
                  <table class="tableNames" align="center">

                    <tr>
                      <td><label for="firstName" class="firstNameLabel"> <b>First Name</b> </label> </td>
                      <td><label class="lastNameLabel"> <b>Last Name</b> </label></td>
                    </tr>

                    <tr>
                      <td><input type="text" required value={this.state.firstName} onChange={this.handleChange} name="firstName" class="firstName" placeholder="First Name " /></td>
                      <td><input type="text" required value={this.state.lastName} onChange={this.handleChange} name="lastName" class="lastName" placeholder="Last Name " /> <br /></td>
                    </tr>

                  </table>

                  <table class="tableMobandGen" align="center">

                    <tr>
                      <td><label for="phone" class="phoneLabel" > Phone </label></td>
                      <td><label for="gender" class="genderLabel"> Gender</label></td>
                    </tr>

                    <tr>
                      <td><input type="text" required value={this.state.phoneNumber} onChange={this.handleChange} name="phoneNumber" class="phone" placeholder="Phone Number " /> <br /> </td>
                      <td><select name="gender" class="gender" value={this.state.gender} onChange={this.handleChange}>
                        <option selected value="" disabled hidden>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="none">Prefer not to say</option>
                        <option value="other">Other</option>
                      </select><br /></td>
                    </tr>

                  </table>

                  <label for="emailAddress" class="emailLabel"> Email </label>
                  <input type="email" required value={this.state.emailAddress} onChange={this.handleChange} name="emailAddress" class="emailAddress" placeholder="Email" /> <br />
                  
                  <label for="password" class="passwordLabel" >Password </label>
                  <input type="password" required value={this.state.password} onChange={this.handleChange} name="password" class="password" placeholder="6 Digit" /> <br />
                  
                  <label for="confirmPassword" class="confirmPassLabel" >Confirm Password </label>
                  <input type="password" required value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPassword" class="confirmPassword" placeholder="6 Digit" /> <br />

                  <button class="registerButton"> Register </button>

                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    )
  }
}



export default Registration 