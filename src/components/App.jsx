import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import styles from './app.module.scss';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem("my-contacts"));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("my-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const submitHandler = data => setContacts(prevContacts => [...prevContacts, data]);

  const deleteContact = contactId => setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));

  const changeFilter = event => setFilter(event.currentTarget.value);

  const getFilteredContacts = () => {
    if (filter.trim().length === 0) {
      return false;
    }
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.trim().toLowerCase()));
  }

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={submitHandler} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={changeFilter} />
      <ContactList 
        contacts={!filteredContacts ? contacts : filteredContacts} 
        onDeleteContact={deleteContact} 
      />
    </div>
  );

}

export default App;

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: "",
//   }

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem("my-contacts")); 
//     if(contacts?.length) { // contacts && contacts.length
//       this.setState({contacts});
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const {contacts} = this.state;
//     if(contacts.length !== prevState.contacts.length) {
//       localStorage.setItem("my-contacts", JSON.stringify(contacts));
//     }
//   }

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   }

//   formSubmitHandler = data => {
//     this.setState(prevState => {
//       return {contacts: [...prevState.contacts, data]};
//     });
//   }

//   changeFilter = event => {
//     this.setState({filter: event.currentTarget.value});
//   }

//   getFilteredContacts = () => {
//     const {contacts, filter} = this.state;

//     if (filter.trim().length === 0) {
//       return false;
//     }
//     return contacts.filter(contact => contact.name.toLowerCase().includes(filter.trim().toLowerCase()));
//   }
  
//   render() {

//     const {contacts, filter} = this.state;
//     const filteredContacts = this.getFilteredContacts();

//     return (
//       <div className={styles.app}>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.formSubmitHandler} contacts={contacts} />

//         <h2>Contacts</h2>
//         <Filter filter={filter} onFilter={this.changeFilter} />
//         <ContactList 
//           contacts={!filteredContacts ? contacts : filteredContacts} 
//           onDeleteContact={this.deleteContact} 
//         />
//       </div>
//     );
//   } 
// };


