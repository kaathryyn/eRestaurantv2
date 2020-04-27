import React, { Component } from 'react';
import staffRegoImg from '../../Images/staff registration.jpg';

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
            errorMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue });
    }

    handleNext(e) {
        var staffRegoInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mobNum: this.state.mobNum,
            gender: this.state.gender,
            email: this.state.email,
            role: this.state.role,
            accNum: this.state.accNum,
            accBSB: this.state.accBSB,
        }
        e.preventDefault();
    }

    render() {
        return (
            <div class="staffRegoFormPage">
                <img src={staffRegoImg} alt="staffRegoImg" class="staffRegoImg" />
                <form class="staffRegoForm" action="../Login/login.js">
                    <h1 class="staffRego">Register Staff</h1>
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

                    <hr />

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

                    <button class="staffRegoNextBtn">Next</button>
                </form>
            </div >
        )
    }
}

export default StaffRegistration;