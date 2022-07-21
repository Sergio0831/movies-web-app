import React from 'react';
import { SearchIcon } from '../icons';
import Button from './Button';
import classes from './SearchForm.module.scss';

type SearchFormProps = {
  placeholder: string;
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchForm = ({ placeholder, search, onSearch }: SearchFormProps) => {
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
          value={search}
          onChange={onSearch}
        />
      </label>
    </form>
  );
};
export default SearchForm;
