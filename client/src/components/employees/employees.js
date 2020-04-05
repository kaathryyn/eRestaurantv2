import React, { Component } from 'react';
import './employees.css';

class Employees extends Component {

  constructor() {
    super();
    this.state = {
        employees: [] //empty employees array
    }
  }

  componentDidMount() {
    fetch('/api/employees') //this makes the call to the backend
    .then(res => res.json())
    .then(employees => this.setState({employees}, () => console.log('Employees fetched..,', employees)));
  }

  render() {
    return (
      <div>
        <h2>Employees</h2>
        <ul>
          {this.state.employees.map(employee => 
            <li key={employee.id}> {employee.firstName} {employee.lastName}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Employees;
