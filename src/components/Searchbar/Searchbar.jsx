import { Formik, Form, Field } from 'formik';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

export const Searchbar = ({onSearch}) => {

  const initialValues = {
    search: '',
  }

  const handleSubmit = (values, actions) => {
    onSearch(values.search.trim());
  }

  return (
    <header className={css.Searchbar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span ><FaSearch /></span>
          </button>

          <Field
            className={css.SearchFormInput}
            type="text"
            name='search'
            autoComplete="off"
            autoFocus
          />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}