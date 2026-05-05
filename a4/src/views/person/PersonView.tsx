import { LinkGroup, } from '@/components';
import { Modal } from '@/components/Modal';
import { IMAGE_BASE_URL, PERSON, } from '@/core/constants';
import type { PersonResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON}/${id}`, {}, [id]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
      <div className="p-6 space-y-6">
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.profile_path}`} alt={data.name} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate(-1)}>Back</button>            
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {data.birthday}
            </p>
            <p className="text-gray-300">{data.biography}</p>
            <LinkGroup
              options={[
                { label: 'Career', to: 'career' },
                { label: 'Images', to: 'images' },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
  );
};
