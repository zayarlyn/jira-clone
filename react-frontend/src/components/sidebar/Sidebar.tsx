import IconBtn from '../util/IconBtn';

const Sidebar = () => {
  return (
    <div className='flex w-14 shrink-0 flex-col items-center justify-between bg-light-c-4 py-6'>
      <div className='flex flex-col gap-y-3'>
        <button className='w-8'>
          <img src='/assets/jira.svg' alt='jira-clone' />
        </button>
        <IconBtn icon='ant-design:search-outlined' />
        <IconBtn icon='ant-design:plus-outlined' />
      </div>
      <div>
        <IconBtn icon='ep:question-filled' />
      </div>
    </div>
  );
};

export default Sidebar;
