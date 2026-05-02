import { ButtonGroup, Link, SearchBar } from '@/components';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();
  const MediaType = searchParams.get('type') || "movie";
  
  const searchChange = (Type: string) => {
    setSearchParams({ query: query, type: Type });
    navigate(`/search?query=${query}&type=${Type}`);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchParams({ query: value, type: MediaType });
    if (value.trim()) {
      navigate(`/search?query=${value}&type=${MediaType}`);
    }
  };
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/movies">Movies</Link>
        <Link to='/television'>TV</Link>
        <Link to='/trending/'>Trending</Link>
        <Link to='/genres/'>Genres</Link>
        <SearchBar value={query} onChange={handleSearch} />
        <ButtonGroup
            value={MediaType}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' }
            ]}
            onClick={searchChange}
          />
      </nav>
    </header>
  );
};