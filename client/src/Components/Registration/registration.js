import React, {Component} from 'react';
import './registration.css'

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
      firstNameError: "First Name is empty.", // strings that represent the error message displayed to the user 
      lastNameError: "Last Name is empty.",
      emailError: "",
      phoneError: "",
      passwordError: "",
      confirmError: "",
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
        console.log(this.state);
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
      <div>
        <h1>
          Join us now. Register below! 
        </h1>
          <p> 
            Please fill in all the required fields to create a new user account.
          </p> 
              <form onSubmit={
                this.handleSubmit
                }>
                <h2>Registration Form:</h2>

                <label>First Name: </label> 
                  <input type="text" value={this.state.firstName} 
                    onChange={this.firsthandler} 
                    placeholder="Enter your First Name " /> 
                  {this.state.firstNameError ? <div>{this.state.firstNameError} </div> : null} <br />

                <label>Last Name: </label> 
                  <input type="text" value= {this.state.lastName} 
                    onChange={this.lasthandler}  
                    placeholder="Enter your  Last Name " /> <br />

                <label>Phone Number: </label> 
                  <input type="text" value={this.state.phoneNumber} 
                    onChange={this.phonehandler} 
                    placeholder="Enter your Phone Number " /> <br />

                <label>Gender :</label><select 
                  onChange={this.genderhandler} 
                  defaultValue="Select Gender">
                    <option defaultValue>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select><br />

                <label>Email Address: </label> 
                  <input type="text" value={this.state.emailAddress} 
                    onChange={this.emailhandler} 
                    placeholder="Enter your Email " /> <br />

                <label>Password: </label> 
                  <input type="password" value={this.state.password} 
                  onChange={this.passwordhandler} 
                  placeholder="Enter your Password " /> <br />

                <label>Confirm Password: </label> 
                  <input type="password" value={this.state.confirmPassword} 
                  onChange={this.confirmpasswordhandler} 
                  placeholder="Enter your Password " /> <br />

                <input type="submit" value="Submit" />
              </form>
      </div>     
    
    )   
  }
             
}

export default Register 