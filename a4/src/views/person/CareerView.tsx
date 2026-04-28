import { ImageGrid } from '@/components';
import { PERSON } from '@/core/constants';
import type { CareerResponse, } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const CareerView = () => {
  const { id } = useParams();
  const { data } = useTmdb<CareerResponse>(`${PERSON}/${id}/movie_credits`, {}, []);

const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title,
    secondaryText: result.character,
    href: `/movie/${result.id}/credits`
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white space-y-6">
      <h2 className="text-2xl font-bold">Career</h2>
      {!data.cast.length && <p className="text-gray-400 text-center">No career information available.</p>}
      <ImageGrid results={gridData} />
    </section>
  );
};
