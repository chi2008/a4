import { useParams } from 'react-router-dom';
import { useTmdb } from '@/hooks';
import { TV_SEASONNUMBER_ENDPOINT } from '@/core/constants'; 
import type { EpisodeResponse } from '@/core/types';
import { ImageGrid } from '@/components';


export const EpisodeView = () => {
const { id, seasonNumber } = useParams<{ id: string; seasonNumber: string }>();
const { data } = useTmdb<EpisodeResponse>( TV_SEASONNUMBER_ENDPOINT(id!, seasonNumber!), {}, [id, seasonNumber]);

  const gridData = (data?.episodes ?? []).map((result) => ({
    id: result.id,
    imagePath: result.still_path,
    primaryText: result.episode_number,
    secondaryText: result.name,
  }));

   if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Seasons</h2>
      {!data.episodes.length && <p className="text-gray-400 text-center">No episodes available.</p>}
      <ImageGrid results={gridData} />
    </section>
  );
};