import React, { Component } from 'react'
import './staffRegistration.css'

class StaffRegistration extends Component {
    render() {
        return (
            <div class="staffRegoForm">
                <h1 class="staffRego">Register Staff</h1>

                <label for="staffFName"><b>First Name</b></label>
                <input type="text" placeholder="First Name" name="staffFName" required />

                <label for="staffLName"><b>Last Name</b></label>
                <input type="text" placeholder="Last Name" name="staffLName" required />

                <label for="staffMobileNumber"><b>Mobile Number</b></label>
                <label for="gender"><b>Gender</b></label>

                <input type="tel" placeholder="Mobile Number" name="staffMobileNumber" required />
                <select name="genders">
                    <option value="" disabled selected hidden>Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="none">Prefer not to say</option>
                </select>

                <label for="staffEmail"><b>Email Address</b></label>

                <input type="email" placeholder="Email Address" name="staffEmail" required />

                <label for="role"><b>Role</b></label>

                <select name="roles">
                    <option value="" disabled selected hidden>Select Role</option>
                    <option value="wait">Waiter/Waitress</option>
                    <option value="chef">Chef</option>
                </select>

                <hr />

                <label for="staffAccountNum"><b>Account Number</b></label>
                <label for="staffBSB"><b>BSB</b></label>

                <input type="text" placeholder="Account Number" name="staffAccountNum" required />
                <input type="text" placeholder="BSB" name="staffBSB" required />

                <hr />

                <button type="next" class="staffRegoNextBtn">Next</button>
            </div>
        )
    }
}

export default StaffRegistration;