import { Icon } from '@iconify/react';
import { Dispatch, SetStateAction, useState } from 'react';
import Item from './Item';

type Prop = {
  list: Category[];
  type: 'normal' | 'multiple';
  updateHandler: Dispatch<SetStateAction<number>>;
};

const DropDown = (props: Prop) => {
  const { list, type, updateHandler } = props;
  const [current, setCurrent] = useState(0);
  const [on, setOn] = useState(false);

  const handleSelect = (idx: number) => () => {
    updateHandler(idx);
    setCurrent(idx);
    setOn(false);
  };

  return (
    <div className='relative text-black text-[15px] font-medium'>
      <button
        onClick={() => setOn((p) => !p)}
        className='flex items-center justify-between w-full rounded-[4px] px-4 bg-[#edf2f7] hover:bg-[#e2e8f0] py-1 border-gray-300 border-[1px]'
      >
        <div>
          <Item
            className={type === 'normal' ? 'mr-4 w-4 h-4' : 'mr-4 w-6 h-6 object-cover'}
            {...list[current]}
          />
        </div>
        <Icon icon='la:angle-down' />
      </button>
      {on && (
        <ul className='absolute  w-full top-9 z-10 bg-white py-2 rounded-[3px] shadow-md'>
          {list.map((props, idx) => (
            <li onClick={handleSelect(idx)} className='px-4 py-2 hover:bg-[#e2e8f0] cursor-pointer'>
              <Item
                className={type === 'normal' ? 'mr-4 w-4 h-4' : 'mr-4 w-6 h-6 object-cover'}
                {...props}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;

type Category = { text: string; icon: string };
