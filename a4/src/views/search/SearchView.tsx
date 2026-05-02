import { ImageGrid, Pagination } from '@/components';
import type { ChangeType, ShResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const getImageUrl = (path: string | undefined) => `https://image.tmdb.org/t/p/w500${path}`;
export const SearchView = () => {

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const debouncedQuery = useDebounce(query, 500);
  const [MediaType, setMediaType] = useState<ChangeType>(searchParams.get('type') as ChangeType || 'movie');
  const { data } = useTmdb<ShResponse>(`https://api.themoviedb.org/3/search/${MediaType}`, { query: debouncedQuery, page},[debouncedQuery, page, MediaType]);



  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath:getImageUrl(result.poster_path || result.profile_path), 
    primaryText: result.original_title || result.name, 
    secondaryText: result.release_date || result.known_for_department,
    media: MediaType,
})) || [];

  if (debouncedQuery && !data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Search for:{debouncedQuery}</h1>
      <ImageGrid results={gridData} onClick={(id) => {setPage(1); navigate(`/${MediaType}/${id}/credits`);}}/>

      {data && data.results && data.results.length > 0 ? (
  <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
) : (
  <p>No search results found.</p>
)}
    </section>
  );
};
