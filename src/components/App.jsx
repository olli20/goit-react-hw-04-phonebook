import { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import styles from './app.module.scss';

class App extends Component {
  state = {
    contacts: [
      // {id: 'id-1', name: 'General emergencies', number: '112'},
      // {id: 'id-2', name: 'Police', number: '102'},
      // {id: 'id-3', name: 'Ambulance', number: '103'},
      // {id: 'id-4', name: 'Fire', number: '101'},
      // {id: 'id-5', name: 'Gas emergency', number: '104'},
    ],
    filter: "",
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("my-contacts")); 
    if(contacts?.length) { // contacts && contacts.length
      this.setState({contacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {contacts} = this.state;
    if(contacts.length !== prevState.contacts.length) {
      localStorage.setItem("my-contacts", JSON.stringify(contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  }

  formSubmitHandler = data => {
    this.setState(prevState => {
      return {contacts: [...prevState.contacts, data]};
    });
  }

  changeFilter = event => {
    this.setState({filter: event.currentTarget.value});
  }

  getFilteredContacts = () => {
    const {contacts, filter} = this.state;

    if (filter.trim().length === 0) {
      return false;
    }
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.trim().toLowerCase()));
  }
  
  render() {

    const {contacts, filter} = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter filter={filter} onFilter={this.changeFilter} />
        <ContactList 
          contacts={!filteredContacts ? contacts : filteredContacts} 
          onDeleteContact={this.deleteContact} 
        />
      </div>
    );
  } 
};

export default App;
