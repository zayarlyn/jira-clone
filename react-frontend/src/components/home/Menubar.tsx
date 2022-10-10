import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import BtnWithIcon from '../util/BtnWithIcon';
import { useProjectQuery } from '../../api/endpoints/project.endpoint';
import { useParams } from 'react-router-dom';

const Menubar = () => {
  const projectId = Number(useParams().projectId);
  const [on, setOn] = useState(true);
  const { data: project } = useProjectQuery(projectId, { skip: !projectId });

  return (
    <motion.div
      initial={{ width: projectId ? 240 : 15 }}
      animate={{ width: projectId && on ? 240 : 15 }}
      transition={{ type: 'tween' }}
      className='relative bg-c-2'
    >
      {projectId ? (
        <div className='h-full w-[15rem] bg-c-2 px-4 py-6'>
          <div className='flex'>
            <div className='grid h-10 w-10 shrink-0 place-items-center bg-cyan-500 text-lg'>
              {project?.name.at(0)}
            </div>
            <div className='ml-2 w-40'>
              <span className='block truncate text-sm font-medium text-c-5'>
                {project?.name ?? 'loading...'}
              </span>
              <span className='text-[13px] text-c-text'>Project Planning</span>
            </div>
          </div>
          <div className='my-5'>
            <BtnWithIcon to={projectId + '/board'} icon='bi:kanban' text='Kanban Board' />
            <BtnWithIcon to={projectId + ''} icon='clarity:settings-solid' text='Project Setting' />
          </div>
          <hr className='border-t-[.5px] border-gray-400' />
        </div>
      ) : null}
      <button
        title='Toggle project sidebar'
        onClick={() => setOn((p) => !p)}
        className={`border-zinc-text00 group peer absolute -right-[14px] top-8 z-[20] grid h-7 w-7 place-items-center rounded-full border-[1px] bg-c-1 hover:border-secondary hover:bg-secondary ${
          projectId && project ? '' : 'pointer-events-none'
        }`}
      >
        <Icon
          className='text-secondary group-hover:text-white'
          icon={on ? 'fa-solid:angle-left' : 'fa-solid:angle-right'}
        />
      </button>
      <div className='absolute top-0 right-0 h-full w-[2px] bg-c-3 peer-hover:bg-secondary' />
    </motion.div>
  );
};

export default Menubar;
