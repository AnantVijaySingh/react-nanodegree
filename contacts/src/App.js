import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
    state = {
        contacts: []
    };

    componentDidMount() {
        ContactsAPI.getAll()
            .then((contacts) => {
            this.setState(() => ({contacts: contacts}))
            })
    }

    removeContact = (contact) => {
        this.setState(function (currentState) {
            return {
                    contacts: currentState.contacts.filter((c) => {return c.id !== contact.id})
                }
        });
        ContactsAPI.remove(contact)
    };

    // Parenthesize the body of function to return an object literal expression:
    // (params) => ({foo: bar})

    render() {
        return (
            <div>
                {/*Adding -- "exact" -- as "/" would partially match every path*/}
                <Route exact path="/" render={() => (
                    <ListContacts
                        onDeleteContact={this.removeContact}
                        onNavigate={this.createContact}
                        contacts={this.state.contacts} />
                )} />
                {/*We can simply use component prop instead of render if we want to pass a component that does not require and prop to be added*/}
                <Route path="/create" component={CreateContact} />
            </div>
        )
    }
}


export default App;
