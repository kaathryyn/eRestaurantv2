import {React, useState, Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {AppBar, TextField, RaisedButton}  from "material-ui/core";


  class Login extends Component {
    constructor(props){
      super(props);
      this.state={
      username:'',
      password:''
      }
    }

  render() {
      return (
        <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Customer Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;
       