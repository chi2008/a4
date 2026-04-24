import { LinkGroup, } from '@/components';
import { Modal } from '@/components/Modal';
import { IMAGE_BASE_URL, PERSON, } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${PERSON}/${id}`, {}, [id]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 space-y-6">
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
                { label: 'Career', to: 'career' },
                { label: 'Images', to: 'image' },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
