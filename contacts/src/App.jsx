import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactList from './ContactList.jsx';

class App extends Component {
  render() {
    return (
        <div className="App">
            <ContactList contacts={[
                {name: 'Harry'},
                {name: 'Hermoine'},
                {name: 'Ron'}
            ]}/>
            <ContactList contacts={[
                {name: 'Albus'},
                {name: 'Severus'},
                {name: 'James'}
            ]} />
        </div>
    )
  }
}

export default App;
