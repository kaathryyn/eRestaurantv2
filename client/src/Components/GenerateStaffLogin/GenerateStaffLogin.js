import React, { Component } from "react";
import { Card } from "@material-ui/core";
import "./GenerateStaffLogin.css";

class GenerateStaffLogin extends Component {
  constructor() {
    super();
    this.state = {
      staffID: '123456',
      password: 'xxxxxxxxxx',
    };
  }
  //It's using a library that generates random passwords
  generatePassword = () => {
    const generator = require('generate-password');
 
     const newPassword = generator.generate({
        length: 10,
        numbers: true
      });
      this.setState({
        password: newPassword 
      })
  }
render() {
  return (
    <div className="wrapper">
      <div className="background_image">
        <Card className="confirmation_box" variant="outlined">
          <h2>1.  Personal Details</h2>
          {/* Name &emsp Gender<br></br>
          Phone Number<br></br>
          Email<br></br>
          Role<br></br>
          Account # */}
        </Card>
        <button onClick={this.generatePassword} className="button1" >Generate Login</button>
        <Card className="login_info" variant="outlined">
          <h2>2.  Login Details</h2>
        StaffID: {this.state.staffID} <br></br>
        Password: {this.state.password}</Card>
      </div>
      <button className="button2">Confirm</button>
    </div>
  );
}
}

export default GenerateStaffLogin;
