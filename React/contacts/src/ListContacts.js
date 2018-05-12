import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ListContacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
    };

    state = {
        query: ''
    };

    updateQuery = (query) => {
        this.setState(() => ({query: query.trim()}))
    };

    clearQuery = () => {
      this.updateQuery('');
    };

    render() {

        const {query} = this.state;
        const {contacts, onDeleteContact} = this.props;

        const showingContact = query ==='' ?
            contacts
            :  contacts.filter((c) => (c.name.toLowerCase().includes(query.toLowerCase())));

        return (
            <div className="list-contacts" >
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search Contacts"
                        value={query}
                        onChange={(event) => {this.updateQuery(event.target.value)}}
                    />
                    <Link
                        to="/create"
                        className="add-contact"
                    >Create Contact</Link>
                </div>
                {
                    showingContact.length !== contacts.length && ( /* && here is an operator that functions like a if statement*/
                        <div className="showing-contacts">
                            <span>Showing {showingContact.length} of {contacts.length} contacts</span>
                            <button onClick={() => this.clearQuery}> {/*Silly Mistake: Tried this.clearQuery() but it did not work as the function was being invoked when the button was created due to the presence of '()' */}
                                Show All
                            </button>
                        </div>
                    )
                }
                <ol className="contact-list">
                    {
                        showingContact.map((contact) => (
                            <li key={contact.id} className="contact-list-item" >
                                <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}} >
                                </div>
                                <div className="contact-details">
                                    <p>{contact.name}</p>
                                    <p>{contact.handle}</p>
                                </div>
                                <button
                                    onClick={() => onDeleteContact(contact)}
                                    className="contact-remove">
                                    Remove
                                </button>
                            </li>
                        ))
                    }
                </ol>
            </div>
        )
    }
}

export default ListContacts;