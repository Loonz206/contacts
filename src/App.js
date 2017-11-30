import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    //calls the API running in the background and populates the data via setState to contacts
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    });
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    //Removing from state also removing from API
    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
      </div>
    )
  }
}

export default App;