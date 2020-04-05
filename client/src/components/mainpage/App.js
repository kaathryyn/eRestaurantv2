import React, {Component} from 'react';
import './App.css';
import Employees from '../employees/employees.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Employees/>
        </header>
      </div>
    );
  }
}

export default App;
