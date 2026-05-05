import { TV_ENDPOINT } from '@/core/constants';
import type { TvResponse} from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);

  const trailerVideo =
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official')) ||
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');


  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Trailers</h2>
      {trailerVideo && (
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${trailerVideo.key}`}
            title="Movie Trailer"
            allowFullScreen
          />    
          </div>
        )}  

    </section>
  );
};
