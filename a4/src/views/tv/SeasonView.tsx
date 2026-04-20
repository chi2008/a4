import { ImageGrid } from '@/components';
import { TV_DETAIL_ENDPOINT } from '@/core/constants';
import type { SeasonResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const SeasonView = () => {
  const { id } = useParams();
  const { data } = useTmdb<SeasonResponse>(`${TV_DETAIL_ENDPOINT(id!)}`, {}, []);

 const gridData = (data?.seasons ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: `Season ${result.season_number}`,
    secondaryText: result.episode_count,
    href: `/tv/${id}/season/${result.season_number}` 
 }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Seasons</h2>
      {!data.seasons.length && <p className="text-gray-400 text-center">No seasons available.</p>}
      <ImageGrid results={gridData} />
    </section>
  );
};
