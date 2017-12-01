import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    screen: 'list', // list or create
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
      <div className="app">
        <Route exact path="/" render={() => (
          <ListContacts
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts}
          />
        )}/>
        <Route path="/create" component={CreateContact} />
      </div>
    )
  }
}

export default App;