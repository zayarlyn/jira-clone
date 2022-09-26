import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../api/apiTypes';
import { usePublicUserQuery } from '../../api/auth.endpoint';

interface Props extends Project {
  idx: number;
}

const ProjectRow = (props: Props) => {
  const { idx, id, name, descr, repo, userId } = props;
  const { data: publicUser } = usePublicUserQuery(userId);

  const navigate = useNavigate();

  return (
    <div
      key={id}
      className='flex border-y-2 border-b-transparent py-1 cursor-pointer hover:border-blue-400 hover:border-b-2'
      onClick={() => navigate(id + '/board')}
    >
      <div className='text-center w-8'>{idx + 1}</div>
      <div className='grow px-2'>{name}</div>
      <div className='grow px-2'>{descr}</div>
      <div className='w-52 px-2'>{publicUser?.username}</div>
    </div>
  );
};

export default ProjectRow;
