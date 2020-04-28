import React, { Component } from 'react';
import "./ForgotPassword.css";
import photo from "../../Images/greyLock.png";
import successTick from "../../Images/successTick.png"
import { auth } from '../../config/fire.js';

class ForgotPassword extends Component {
  state = {
    email: '',
    error: '',
    formSent: false,
  }
  
  handleSendReset = (event) => {
    event.preventDefault();
    const { email } = this.state;

    if (email) {
      this.setState({ working: true });

      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.setState({ formSent: true });
        }, error => {
          this.setState({ error: error.message });
        });
    }
  }
  setEmailText = (evt) => {
    this.setState({ email: evt.target.value });
  }

  render() {
    const {
      email,
      error,
      formSent,
    } = this.state;

    let component;
    if (formSent) {
      component = (
        <div className="success">
          <img src={successTick} className="greenTick" alt="lock"/>
          <p>An email to reset your password has been sent!</p>
          {/* <div className='form-group row'>
            <input
                type="homePage"
                value="Login Page"
            />
          </div> */}
        </div>
      );
    } else {
      component = (
        <form onSubmit={this.handleSendReset}>
          
          {error ? <div className="error">{error}</div> : ''}
          <div>
            <img src={photo} className="photo" alt="lock"/>
          </div>
          <p>Forgot Password?</p>
          <p>Enter your email address below and we'll send you a link to reset your password.</p>
          <div className='form-group row'>
            <input
              onChange={this.setEmailText}
              value={email}
              type="text"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group row">
            <input
              type="submit"
              value="Send Link"
            />
          </div>
        </form>
      );
    }

    return component;
  }
}
export default ForgotPassword;