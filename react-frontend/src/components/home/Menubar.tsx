import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import BtnWithIcon from '../util/BtnWithIcon';
import { useProjectQuery } from '../../api/project.endpoint';
import { useParams } from 'react-router-dom';

const Menubar = () => {
  const { projectId } = useParams();
  const [on, setOn] = useState(true);
  const { data } = useProjectQuery(projectId ? +projectId : 1);

  return (
    <motion.div
      initial={{ width: 240 }}
      animate={{ width: on ? 240 : 15 }}
      transition={{ type: 'tween' }}
      className='relative'
    >
      <div className='h-full w-[15rem] bg-light-c-2 px-4 py-6 text-light-c-3'>
        <div className='flex'>
          <div className='h-10 w-10 shrink-0 bg-cyan-500'></div>
          <div className='ml-2 w-40'>
            <span className='block text-sm font-medium truncate'>{data?.name ?? 'loading...'}</span>
            <span className='text-[13px] text-[#42526e]'>Project Planning</span>
          </div>
        </div>
        <div className='my-5'>
          <BtnWithIcon to={projectId + '/board'} icon='bi:kanban' text='Kanban Board' />
          <BtnWithIcon to={projectId + '/roadmap'} icon='carbon:roadmap' text='Roadmap' />
          <BtnWithIcon to={projectId + '/commits'} icon='material-symbols:commit' text='Commits' />
          <BtnWithIcon to={projectId + ''} icon='clarity:settings-solid' text='Project Setting' />
        </div>
        <hr className='border-t-[.5px] border-gray-400' />
        <div className='my-5'></div>
      </div>
      <button
        onClick={() => setOn((p) => !p)}
        className='group peer absolute -right-[14px] top-8 z-20 grid h-7 w-7 place-items-center rounded-full border-[1px] border-zinc-300 bg-white hover:border-light-c-6 hover:bg-light-c-6'
      >
        <Icon
          className='text-light-c-6 group-hover:text-white'
          icon={on ? 'fa-solid:angle-left' : 'fa-solid:angle-right'}
        />
      </button>
      <div className='absolute top-0 right-0 h-full w-[2px] bg-gray-200 peer-hover:bg-light-c-6' />
    </motion.div>
  );
};

export default Menubar;
