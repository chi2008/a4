import { ImageGrid, Pagination } from '@/components';
import { IMAGE_BASE_URL } from '@/core/constants';
import type { ChangeType, ImageCell, ShResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


export const SearchView = () => {
  const getImageUrl = (fileName: string) => `${IMAGE_BASE_URL}${fileName}`;
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const debouncedQuery = useDebounce(query, 500);
  const [MediaType, setMediaType] = useState<ChangeType>(searchParams.get('type') as ChangeType || 'movie');
  const { data } = useTmdb<ShResponse>(`search/${MediaType}`, { query: debouncedQuery, page: page },[debouncedQuery, page, MediaType]);



  const gridData: ImageCell[] = data?.results?.map((result: any) => ({
    id: result.id,
    imagePath: getImageUrl(result.poster_path || result.profile_path), 
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
