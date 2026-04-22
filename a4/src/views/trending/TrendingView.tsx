import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { MOVIE_TRENDING, TV_TRENDING} from '@/core/constants';
import type { MediaResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const Trending={
    movie:MOVIE_TRENDING,
    tv:TV_TRENDING,
  }
  const TrendingChoose=Trending[Trending]
  const interval = searchParams.get('interval') || 'day';
  const { data } = useTmdb<MediaResponse>(`${TrendingChoose}/${interval}`, { page, time_window: interval }, [page, interval]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Trending</h1>
        <ButtonGroup
          value={Trending}
          options={[
            { label: 'Movie', value: 'movie' },
            { label: 'Tv', value: 'tv' },
          ]}
          onClick={(value) => setSearchParams({ Trending: value })}
        />
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => setSearchParams({ interval: value })}
        />
      </div>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/${TrendingChoose}/${id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
