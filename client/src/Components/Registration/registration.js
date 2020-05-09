import React, {Component} from 'react';
import './registration.css';
import customerRegistrationImage from '../../Images/customer_registration.jpg';
import formError from './formError';
import firebase from '../../config/firebase';
import Grid from '@material-ui/core/Grid';

class Register extends Component {
  constructor(props){  
    super(props); // pass properties to the parent constructor

    this.state = { //state where the values given by the users is being stored - this is the initial value 
      firstName:'',
      lastName:'',
      phoneNumber:'',
      gender:'',
      emailAddress:'',
      password:'',
      confirmPassword:'',
      errorMessage: null

    };
    this.handleChange=this.handleChange.bind(this); //method used to bind the handleSubmit operation with the constructor - setting up the handle change method 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value; 

    this.setState ({[itemName]: itemValue}, () => {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({errorMessage: "Passwords do not match"})
      }
      else {
        this.setState({errorMessage: null});
      }
    });
  }

  handleSubmit = (e) => { //storing the state when the user provides data  
    var registrationInfo = {
      firstName: this.state.firstName, 
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      emailAddress: this.state.emailAddress,
      password: this.state.password
    }
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword (
      registrationInfo.emailAddress,
      registrationInfo.password
    ).then(()=> {
      this.props.registerUser(registrationInfo.firstName)
    })
     .catch(error => {
      if (error.message !== null) {
        this.setState ({errorMessage: error.message});
      } else {
        this.setState({errorMessage: null});
      }
    });
  }


    render() {
      return (
      <div class= "customerRegistrationForm">
      <img src={customerRegistrationImage} alt = "customerRegistrationImage" class="customerRegistrationImage" />
              <form class= "customerRegistrationForm" onSubmit = {this.handleSubmit}>
                <h1 class= "registerLabel"> Register</h1>

                {this.state.errorMessage !== null ? (
                  <formError theMessage = {this.state.errorMessage} />          
                ): null }
  
            <table class="tableNames" align="center">
              <tr>
                <td><label for = "firstName" class = "firstNameLabel"> <b>First Name</b> </label> </td>
                <td><label class = "lastNameLabel"> <b>Last Name</b> </label></td>
              </tr>

              <tr>
                <td><input type="text" required value={this.state.firstName} onChange={this.handleChange} name = "firstName" class = "firstName" placeholder="First Name " /></td>
                <td><input type="text" required value= {this.state.lastName} onChange={this.handleChange} name = "lastName" class = "lastName" placeholder="Last Name " /> <br /></td>
              </tr>
            </table>

            <table class="tableMobandGen" align="center">
              <tr>
                <td><label for = "phone" class = "phoneLabel" > Phone </label></td>
                <td><label for = "gender" class = "genderLabel"> Gender</label></td>
              </tr>

              <tr>
                <td><input type="text" required value={this.state.phoneNumber} onChange={this.handleChange} name = "phoneNumber" class = "phone" placeholder="Phone Number " /> <br /> </td>
                <td><select 
                  name = "gender" class = "gender" value = {this.state.gender} onChange={this.handleChange}>
                  <option selected value="Select Gender" disabled hidden />
                    <option defaultValue>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select><br /> </td>
              </tr>
            </table>

            <table class = "emailAndPassword" align = "center">

                <tr><label for = "emailAddress" class = "emailLabel"> Email </label></tr>
                <tr><input type= "emailAddress" required value={this.state.emailAddress} onChange={this.handleChange} name = "emailAddress" class = "email" placeholder="Email " /> <br /></tr>
  
                <tr><label for = "password" class = "passwordLabel" >Password </label></tr>
                <tr><input type= "password" required value={this.state.password} onChange={this.handleChange} name = "password" class = "password" placeholder= "6 Digit" /> <br /></tr>



                <tr><label for = "confirmPassword" class = "confirmPassLabel" >Confirm Password </label></tr>
                <tr><input type="password" required value={this.state.confirmPassword} onChange={this.handleChange} name = "confirmPassword" class = "confirmPassword"placeholder="6 Digit" /> <br /></tr>


            </table>

                <button class = "registerButton" > Register </button>
              </form>
      </div>     
    
    )   
  }
             
}

export default Register 