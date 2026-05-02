import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import type { MediaResponse,ChangeType} from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const GenresView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [MediaType, setMediaType] = useState<ChangeType>(searchParams.get('Type') as ChangeType || 'movie');
  const interval = searchParams.get('interval') || '28';
  const { data } = useTmdb<MediaResponse>(`https://api.themoviedb.org/3/discover/${MediaType}`, {page,with_genres: interval}, [page, interval, MediaType]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title || result.name,
  })); 

  const movie = [
    { label: 'Action', value: '28' }, 
    { label: 'Advencture', value: '12' },
    { label: 'Animation', value: '16' },
    { label: 'Crime', value: '80' },
    { label: 'Family', value: '10751' },
    { label: 'Fantasy', value: '14' },
    { label: 'History', value: '36' },
    { label: 'Horror', value: '27' },
    { label: 'Mystery', value: '9648' },
    { label: 'Sci-Fi', value: '878' },
  ]
  const tv = [
    { label: 'Action', value: '10759' }, 
    { label: 'Animation', value: '16' },
    { label: 'Comedy', value: '35' },
    { label: 'Crime', value: '80' },
    { label: 'Documentary', value: '99' },
    { label: 'Drama', value: '18' },
    { label: 'Family', value: '10751' },
    { label: 'Kids', value: '10752' },
    { label: 'Mystery', value: '9648' },
    { label: 'Sci-Fi', value: '10765' },
  ];
  const Change = (type: ChangeType) => {
    setMediaType(type);
    setPage(1); 
    const defaultGenreId = type === 'tv' ? tv[0].value : movie[0].value;
    setSearchParams({ interval: defaultGenreId, type: type });
  };
  
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold">Genres</h1>
        <ButtonGroup
          value={MediaType}
          options={[
            { label: 'Movie', value: 'movie' },
            { label: 'Tv', value: 'tv' },
          ]}
         onClick={(value) => Change(value as ChangeType)}
        />
        </div>
        <div> 
        <ButtonGroup
          value={interval}
          options={(MediaType === 'movie' ? movie : tv)}
          onClick={(value) => setSearchParams({ interval: value })}
        />
      </div>

      <ImageGrid results={gridData} onClick={(id) => navigate(`/${MediaType}/${id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
