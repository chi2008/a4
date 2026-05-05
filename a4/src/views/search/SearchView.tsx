import { ImageGrid, Pagination } from '@/components';
import { SEARCH_ENDPOINT } from '@/core/constants';
import type { ChangeType, ShResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const usequery = searchParams.get('query') || '';
  const usetype = searchParams.get('type') as ChangeType || 'movie';

  const [MediaType, setMediaType] = useState<ChangeType>(searchParams.get('type') as ChangeType || 'movie');
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [page, setPage] = useState<number>(1);
  const debouncedQuery = useDebounce(query, 300);
  const getImageUrl = (path: string | undefined) => `https://image.tmdb.org/t/p/w500${path}`;

  useEffect(() => {
    setQuery(usequery);
    setMediaType(usetype);
    setPage(1); 
  }, [searchParams]);

  const { data } = useTmdb<ShResponse>(`${SEARCH_ENDPOINT}/${MediaType}`, { query: debouncedQuery || '', page }, [debouncedQuery, page, MediaType]);



  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath:getImageUrl(result.poster_path || result.profile_path), 
    primaryText: result.original_title || result.name, 
    secondaryText: result.release_date || result.known_for_department,
    media: MediaType,
})) || [];

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Search for:{debouncedQuery}</h1>
      <ImageGrid results={gridData} onClick={(id) => {setPage(1); navigate(`/${MediaType}/${id}`);}}/>

      {data && data.results && data.results.length > 0 ? (
  <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
) : (
  <p>No search results found.</p>
)}
    </section>
  );
};
