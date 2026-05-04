import { LinkGroup, } from '@/components';
import { Modal } from '@/components/Modal';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);

  

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 space-y-6">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={data.title} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {data.release_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            
            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
                { label: 'Trailers', to: 'trailers'},
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
