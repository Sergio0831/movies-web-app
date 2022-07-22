import { useState } from 'react';

const useSearch = <T = object>(items: T[], category?: string) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState<T[]>(items);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (searchQuery: string, category: string) => {
    setIsLoading(true);
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery, category })
    });
    const result = await response.json();
    if (result) {
      setFiltered(result);
      setIsLoading(false);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      handleSearch(value, category);
    } else {
      setFiltered(items);
      setIsLoading(false);
    }
  };

  return {
    searchQuery,
    onChange,
    filtered,
    isLoading
  };
};

export default useSearch;
