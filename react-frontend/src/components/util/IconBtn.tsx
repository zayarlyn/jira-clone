import { Icon } from '@iconify/react';

const IconBtn = ({ icon }: { icon: string }) => {
  return (
    <button className='rounded-full p-[5px] hover:bg-[#4c3fd1]'>
      <Icon className='text-2xl text-white' icon={icon} />
    </button>
  );
};

export default IconBtn;
