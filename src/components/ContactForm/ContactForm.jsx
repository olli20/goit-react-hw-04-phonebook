import {useState} from 'react';
import {nanoid} from "nanoid";
import PropTypes from 'prop-types';

import initialState from './initialState';

import styles from './contact-form.module.scss';

const ContactForm = ({onSubmit, contacts}) => {
    const [state, setState] = useState({...initialState});

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleChange = ({target}) => {
        const {name, value} = target;
        setState(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = event => {
        event.preventDefault();

        const isNameAlreadyHere = contacts.filter(contact => contact.name.toLowerCase() === name.toLowerCase()).length;
        if(isNameAlreadyHere){
           return alert(`${name} is already in contacts`);
        };
       
        const newContact = {
          name,
          number,
          id: nanoid(),
        };

        onSubmit(newContact);
        setState({...initialState});
    }
    
    const {name, number} = state;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputBlock}>
                <label htmlFor={nameInputId} className={styles.name}>Name</label>
                <input
                    type="text"
                    name="name"
                    id={nameInputId}
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.inputBlock}>
                <label htmlFor={numberInputId} className={styles.name}>Number</label>
                <input
                    type="tel"
                    name="number"
                    id={numberInputId}
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <button type="submit" className={styles.btn}>Add contact</button>
        </form> 
    )
}

export default ContactForm;

ContactForm.defaultProps = {
    contacts: [],
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })).isRequired,
}


// class ContactForm extends Component {
//     state = {
//         name: '',
//         number: '',
//     };

//     nameInputId = nanoid();
//     numberInputId = nanoid();

//     handleInputChange = event => {
//         const {name, value} = event.currentTarget;
//         this.setState({
//           [name]: value,
//         });
//     }

//     handleFormSubmit = event => {
//         event.preventDefault();
//         const {name, number} = this.state;
//         const {contacts} = this.props;

//         const isNameAlreadyHere = contacts.filter(contact => contact.name.toLowerCase() === name.toLowerCase()).length;
//         if(isNameAlreadyHere){
//            return alert(`${name} is already in contacts`);
//         };
       
//         const newContact = {
//           name: name,
//           number: number,
//           id: nanoid(),
//         };

//         this.props.onSubmit(newContact);
//         this.reset();
//     }

//     reset = () => {
//         this.setState({ name: "", number: "", });
//     }

//     render() {
//         const {name, number} = this.state;

//         return (
//             <form onSubmit={this.handleFormSubmit} className={styles.form}>
//                 <div className={styles.inputBlock}>
//                     <label htmlFor={this.nameInputId} className={styles.name}>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         id={this.nameInputId}
//                         value={name}
//                         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                         required
//                         onChange={this.handleInputChange}
//                         className={styles.input}
//                     />
//                 </div>
//                 <div className={styles.inputBlock}>
//                     <label htmlFor={this.numberInputId} className={styles.name}>Number</label>
//                     <input
//                         type="tel"
//                         name="number"
//                         id={this.numberInputId}
//                         value={number}
//                         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                         required
//                         onChange={this.handleInputChange}
//                         className={styles.input}
//                     />
//                 </div>
//                 <button type="submit" className={styles.btn}>Add contact</button>
//             </form> 
//     )}
// }