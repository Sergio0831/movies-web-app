import { useSearchMoviesMutation } from "app/movie.api";
import { useState } from "react";

const useSearch = (category?: string) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMovies, { isLoading, data: movies }] = useSearchMoviesMutation();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      await searchMovies({ searchQuery: value, category: category });
    }
  };

  return {
    searchQuery,
    onChange,
    isLoading,
    movies
  };
};

export default useSearch;

