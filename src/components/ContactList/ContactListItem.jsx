import PropTypes from 'prop-types';

import { HiXMark } from "react-icons/hi2";

import styles from './contact-list.module.scss';

const ContactListItem = ({id, name, number, onDeleteContact}) => {
    return (
        <li className={styles.listItem}>
            <span>{name}: </span><span>{number}</span>
            <button onClick={() => onDeleteContact(id)} type="button" className={styles.btn}>
                <HiXMark />
            </button>
        </li>
    );
}

export default ContactListItem;

ContactListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}