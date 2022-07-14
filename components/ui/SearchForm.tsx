import React from 'react';
import { SearchIcon } from '../icons';
import Button from './Button';
import classes from './SearchForm.module.scss';

type SearchFormProps = {
  placeholder: string;
};

const SearchForm = ({ placeholder }: SearchFormProps) => {
  return (
    <form
      className={classes.form}
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
    >
      <label htmlFor='search'>
        <Button type='submit'>
          <SearchIcon />
        </Button>
        <input
          className={`heading-m`}
          type='text'
          placeholder={`Search for ${placeholder}`}
        />
      </label>
    </form>
  );
};
export default SearchForm;
