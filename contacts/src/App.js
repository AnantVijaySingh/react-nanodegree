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
    };

    removeContact = (contact) => {
        this.setState(function (currentState) {
            return {
                    contacts: currentState.contacts.filter((c) => {return c.id !== contact.id})
                }
        });
        ContactsAPI.remove(contact)
    };

    createContact = (contact) => {
        ContactsAPI.create(contact)
            .then((contact) => {
            this.setState((currentState) => ({
                contacts: currentState.contacts.concat(contact)
            }))
            })
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
                {/*We can simply use component prop instead of render if we want to pass a component that does not require and prop to be added
                <Route path="/create" component={CreateContact} /> */}

                {/* ------ Route provides us with a history prop that has a push method that helps to change the URL to navigate the app -------- */ }

                {/* We are also using an arrow function instead of simply passing this.createContact(contact) to the onCreateContact prop because we want to use the history prop to update the URL */ }
                <Route path="/create" render={({ history }) => (
                    <CreateContact
                        onCreateContact={(contact) => {
                            this.createContact(contact);
                            history.push('/');
                        }}
                    />
                )}  />
            </div>
        )
    }
}


export default App;
