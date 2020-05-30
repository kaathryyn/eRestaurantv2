import React, { Component } from 'react';
import staffRegoImg from '../../Images/staff_registration.jpg';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import { Card, Button } from '@material-ui/core';
import firebase from '../../config/firebase';

import './staffRegistration.css';

class StaffRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            mobNum: '',
            gender: '',
            email: '',
            role: '',
            accNum: '',
            accBSB: '',
            password: 'xxxxxxxxxx',
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.addStaff = this.addStaff.bind(this);
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue });
    }

    addStaff = (e) => {
        e.preventDefault();
        const staffDb = firebase.firestore();
        firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(cred => {
            staffDb.collection("staff").doc(cred.user.uid).set(
                {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    mobNum: this.state.mobNum,
                    gender: this.state.gender,
                    email: this.state.email,
                    role: this.state.role,
                    accNum: this.state.accNum,
                    accBSB: this.state.accBSB,
                    password: this.state.password
                });
        }).then(() => {
            this.setState({
                firstName: '',
                lastName: '',
                mobNum: '',
                gender: '',
                email: '',
                role: '',
                accNum: '',
                accBSB: '',
                password: ''
            })
        }).catch(error => {
            if (error.message != null) {
                this.setState({ errorMessage: error.message });
            } else {
                this.setState({ errorMessage: null });
            }
        });
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
            <Grid container>
                <Grid item xs={6} >
                    <div class="staffRegoImg" >
                        <img src={staffRegoImg} alt="staffRegoImg" />
                    </div>

                </Grid>
                <Grid item xs={6}>
                    <form class="staffRegoForm" onSubmit={this.addStaff}>
                        <FormControl>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <h1 class="staffRego">Register Staff</h1>
                                </Grid>
                                <Grid item>
                                    <table class="tableNames" align="center">
                                        <tr>
                                            <td><label for="firstName" class="firstNameLbl"><b>First Name</b></label></td>
                                            <td><label for="lastName" class="lastNameLbl"><b>Last Name</b></label></td>
                                        </tr>
                                        <tr>
                                            <td><input type="text" placeholder="First Name" name="firstName" class="firstName" required value={this.state.firstName} onChange={this.handleChange} /></td>
                                            <td><input type="text" placeholder="Last Name" name="lastName" class="lastName" required value={this.state.lastName} onChange={this.handleChange} /></td>
                                        </tr>
                                    </table>

                                    <table class="tableMobandGen" align="center">
                                        <tr>
                                            <td><label for="mobNum" class="mobNumLbl"><b>Mobile Number</b></label></td>
                                            <td><label for="gender" class="genderLbl"><b>Gender</b></label></td>
                                        </tr>
                                        <tr>
                                            <td><input type="text" placeholder="Mobile Number" name="mobNum" class="mobNum" maxLength={10} required value={this.state.mobNum} onChange={this.handleChange} /></td>
                                            <td>
                                                <select name="gender" class="gender" value={this.state.gender} onChange={this.handleChange}>
                                                    <option selected value="" disabled hidden />
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                    <option value="other">Other</option>
                                                    <option value="none">Prefer not to say</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>


                                    <label for="email" class="emailLbl"><b>Email Address</b></label>
                                    <input type="email" placeholder="Email Address" name="email" class="emailInput" required value={this.state.email} onChange={this.handleChange} />

                                    <label for="role" class="roleLbl"><b>Role</b></label>
                                    <select name="role" class="roleSelect" value={this.state.role} onChange={this.handleChange} >
                                        <option selected value="" disabled hidden />
                                        <option value="wait">Waiter/Waitress</option>
                                        <option value="chef">Chef</option>
                                        <option value="businessOwner">Business Owner</option>
                                        <option value="restaurantManager">Restaurant Manager</option>
                                    </select>

                                    <table class="tableAccDetails" align="center">
                                        <tr>
                                            <td><label for="accNum" class="accNumLbl"><b>Account Number</b></label></td>
                                            <td><label for="accBSB" class="accBSBLbl"><b>BSB</b></label></td>
                                        </tr>
                                        <tr>
                                            <td><input type="text" placeholder="Account Number" name="accNum" class="accNum" maxLength={12} required value={this.state.accNum} onChange={this.handleChange} /></td>
                                            <td><input type="text" placeholder="BSB" name="accBSB" class="accBSB" maxLength={6} required value={this.state.accBSB} onChange={this.handleChange} /></td>
                                        </tr>
                                    </table>
                                </Grid>
                                <Grid item>
                                    <button onClick={this.generatePassword} className="button1" >Generate Password</button>
                                    <Card className="login_info" variant="outlined">
                                        <h2>Login Details</h2>
                                Email: {this.state.email} <br></br>
                                Password: {this.state.password}
                                    </Card>
                                    <button class="staffRegoSubmitBtn">Submit</button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

export default StaffRegistration;