import { ButtonGroup,ImageGrid, Pagination } from '@/components';
import { TV_AIRING_TODAY, TV_ON_THE_AIR, TV_POPUALR, TV_TOP_RATED } from '@/core/constants';
import type { MediaResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Television = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'airing_today';
  const Chooseinterval ={
    airing_today:TV_AIRING_TODAY,
    on_the_day:TV_ON_THE_AIR,
    tv_popualr:TV_POPUALR,
    tv_top_rated:TV_TOP_RATED,
  }
  const Choose = Chooseinterval[interval]
  const { data } = useTmdb<MediaResponse>(Choose, { page }, [Choose, page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <h1 className="text-3xl font-bold mb-4">TV</h1>
        <ButtonGroup
          value={interval}
          onClick={(value: string) => {
            setSearchParams({ interval: value });
          }}
          options={[
            { label: 'Airing today', value: 'airing_today' },
            { label: 'On the day', value: 'on_the_day' },
            { label: 'Popular', value: 'tv_popualr'},
            { label: 'Top Rate', value: 'tv_top_rated'},
          ]}
        />
        <ImageGrid results={gridData} onClick={(id) => navigate(`/tv/${id}/seasons`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
