import React, { Component } from 'react';

class ContactList extends React.Component {
	render() {
		const people = this.props.contacts;
		console.log(people);

		return (
			<ol>
				{people.map((person) =>(
				<li key={person.name}>
					{person.name}
				</li>))}
			</ol>
		)
	}
}

export default ContactList;