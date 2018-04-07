import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
    state = {
        contacts: [],
        screen: 'list'
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

    createContact = () => {
        this.setState(() => ({screen: 'create'}))
    };

    // Parenthesize the body of function to return an object literal expression:
    // (params) => ({foo: bar})

    render() {
        return (
            <div>
                { this.state.screen === 'list' && (
                    <ListContacts
                        onDeleteContact={this.removeContact}
                        onNavigate={this.createContact}
                        contacts={this.state.contacts} />
                )}
                { this.state.screen === 'create' && (
                    <CreateContact/>
                )}
            </div>
        )
    }
}


export default App;
