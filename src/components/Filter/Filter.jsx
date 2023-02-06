import PropTypes from 'prop-types';

import styles from './filter.module.scss';

const Filter = ({filter, onFilter}) => {
    return (
        <>
            <p className={styles.message}>Find contacts by name</p>
            <input 
                type="text"
                value={filter} 
                onChange={onFilter} 
                className={styles.input}
            />
        </>
    )
}

export default Filter;

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired,
}

