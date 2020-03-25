import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {

  constructor() {
    super();
    this.state = {
        customers: [] //empty customers array
    }
  }

  componentDidMount() {
    fetch('/api/customers') //this makes the call to the backend
    .then(res => res.json())
    .then(customers => this.setState({customers}, () => console.log('Customers fetched..,', customers)));
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {this.state.customers.map(customer => 
            <li key={customer.id}> {customer.firstName} {customer.lastName}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Customers;
