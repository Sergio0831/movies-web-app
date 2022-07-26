import { TMovie } from 'types/movies';
import { useDebounce } from './useDebounce';
import { useSearchMoviesMutation } from 'app/movie.api';
import { useState } from 'react';

const useSearch = <T = object>(items: T[], category?: string) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState<T[]>(items);
  const debounced = useDebounce(searchQuery);
  const [searchMovies, { isLoading, isSuccess: success, data: movies }] =
    useSearchMoviesMutation();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      await searchMovies({ searchQuery: value, category: category });
    } else {
      setFiltered(items);
    }
  };

  return {
    searchQuery,
    onChange,
    filtered,
    isLoading,
    movies,
    success
  };
};

export default useSearch;
