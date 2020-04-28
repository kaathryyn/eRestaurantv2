import React, {Component} from 'react';
import './registration.css';
import customerRegistrationImage from '../../Images/customer_registration.jpg';

class Register extends Component {
  constructor(props){  
    super(props); // pass properties to the parent constructor

    this.state = { //state where the values given by the users is being stored - this is the initial value 
      firstName:"",
      lastName:"",
      phoneNumber:"",
      gender:"",
      emailAddress:"",
      password:"",
      confirmPassword:"",

    }

    this.handleSubmit=this.handleSubmit.bind(this) //method used to bind the handleSubmit operation with the constructor 
  }

    firsthandler = (event) => { //gather data from first name input field
      this.setState( {
        firstName: event.target.value
      })
    }

    lasthandler = (event) => { //gather data from last name input field
      this.setState( { //user provides input in the heads and hit empty
        lastName: event.target.value
      })
    }

    phonehandler = (event) => { //gather data from phone input field
      this.setState( { //user provides input in the heads and hit empty
        phoneNumber: event.target.value
      })
    }

    //genderhandler - an option handler 
    genderhandler = (event) => { //gather data from phone input field
      this.setState( { //user provides input in the heads and hit empty
        gender: event.target.value
      })
    }

    emailhandler = (event) => { //gather data from email input field
      this.setState( { //user provides input in the heads and hit empty
        emailAddress: event.target.value
      })
    }

    passwordhandler = (event) => { //gather data from password input field
      this.setState( { //user provides input in the heads and hit empty
        password: event.target.value
      })
    }

    confirmpasswordhandler = (event) => { //gather data from confirm password input field
      this.setState( { //user provides input in the heads and hit empty
        confirmPassword: event.target.value
      })
    }


    handleSubmit = (event) => { //storing the state when the user provides data  
      alert(`${this.state.firstName} ${this.state.lastName}  You are now Registered! Please check your inbox your confirmation.`)
      const isValid = this.validate();
      if (isValid) {
      console.log(this.state);
      }
      this.setState ( { //program is aware that the state has changed - after the user has input the values 
        firstName:"",
        lastName:"",
        phoneNumber:"",
        gender:"",
        emailAddress:"",     
        password:"",
        confirmPassword:"",
      })
    event.preventDefault()
    }
  
  
    render() {return (
      <div class= "customerRegistrationForm">
      <img src={customerRegistrationImage} alt="customerRegistrationImage" class="customerRegistrationImage" />
              <form class= "custRegForm" actionSubmit={
                this.handleSubmit
                }>
                <h1 class= "registerLabel"> Register</h1>
            
            <table>
              <tr>
                <td><label for = "firstName" class = "firstNameLabel">First Name </label> </td>
                <td><label class = "lastNameLabel"> Last Name </label></td>
              </tr>

              <tr>
                <td><input type="text" required value={this.state.firstName} onChange={this.firsthandler} name = "firstName" class = "firstName" placeholder="First Name " /></td>
                <td><input type="text" required value= {this.state.lastName} onChange={this.lasthandler} name = "lastName" class = "lastName" placeholder="Last Name " /> <br /></td>
              </tr>
            </table>

            <table>
              <tr>
                <td><label for = "phone" class = "phoneLabel" > Phone </label></td>
                <td><label for = "gender" class = "genderLabel"> Gender</label></td>
              </tr>

              <tr>
                <td><input type="text" required value={this.state.phoneNumber} onChange={this.phonehandler} name = "phone" class = "phone" placeholder="Phone Number " /> <br /> </td>
                <td><select 
                  name = "gender" class = "gender" value = {this.state.gender} onChange={this.genderhandler}>
                  <option selected value="Select Gender" disabled hidden />
                    <option defaultValue>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select><br /> </td>
              </tr>
            </table>

            <table>

                <tr><label for = "emailAddress" class = "emailLabel"> Email </label></tr>
                <tr><input type= "emailAddress" required value={this.state.emailAddress} onChange={this.emailhandler} name = "emailAddress" class = "email" placeholder="Email " /> <br /></tr>
  
                <tr><label for = "password" class = "passwordLabel" >Password </label></tr>
                <tr><input type= "password" required value={this.state.password} onChange={this.passwordhandler} name = "password" class = "password" placeholder= "6 Digit" /> <br /></tr>



                <tr><label for = "confirmPassword" class = "confirmPassLabel" >Confirm Password </label></tr>
                <tr><input type="password" required value={this.state.confirmPassword} onChange={this.confirmpasswordhandler} name = "confirmPassword" class = "confirmPassword"placeholder="6 Digit" /> <br /></tr>


            </table>


                <button name = "register" class = "registerButton">Register</button>
              </form>
      </div>     
    
    )   
  }
             
}

export default Register 