import { ImageGrid } from '@/components';
import { PERSON } from '@/core/constants';
import type { ImageResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImageView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImageResponse>(`${PERSON}/${id}/images`, {}, []);

  const gridData = (data?.profiles ?? []).map((result) => ({
    id: result.file_path,
    imagePath: result.file_path,
    primaryText: '',
    secondaryText: '',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Images</h2>
      {!data.profiles.length && <p className="text-gray-400 text-center">No images available.</p>}
      <ImageGrid results={gridData} />
    </section>
  );
};
