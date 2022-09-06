import { Badge } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { Dispatch, useEffect, useState } from 'react';
import { A, T } from '../issue/CreateIssueModel';
import Item from './Item';

type Prop = {
  list: Category[];
  type: 'normal' | 'multiple';
  dispatch: Dispatch<A>;
  actionType: T;
};

const DropDown = (props: Prop) => {
  const { list, type, dispatch, actionType } = props;
  const isMulti = type === 'multiple';
  const [localList, setLocalList] = useState<Category[]>(isMulti ? list.slice(1) : list);
  const [current, setCurrent] = useState<Category[] | number>(isMulti ? [list[0]] : 0);
  const [on, setOn] = useState(false);

  const parseIds = (ary: Category[]) => ary.map(({ value }) => value);

  useEffect(() => {
    dispatch({
      type: actionType,
      value: isMulti ? parseIds(current as Category[]) : list[0].value,
    });
  }, []);

  const handleSelect = (idx: number) => () => {
    if (isMulti) {
      const [clone, resultList] = modifyItems(idx, localList, current as Category[]);
      dispatch({ type: actionType, value: isMulti ? parseIds(resultList) : localList[idx].value });
      setLocalList(clone);
      setCurrent(resultList);
    } else {
      setCurrent(idx);
      dispatch({ type: actionType, value: localList[idx].value });
    }
    setOn(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>, idx: number) => {
    e.stopPropagation();
    const [clone, resultList] = modifyItems(idx, current as Category[], localList);
    setLocalList(resultList);
    setCurrent(clone);
    dispatch({ type: actionType, value: isMulti ? parseIds(clone) : localList[idx].value });
  };

  return (
    <div className='relative text-black text-[15px] font-medium'>
      <button
        onClick={() => setOn((p) => !p)}
        className='flex items-center justify-between w-full rounded-[4px] px-4 bg-[#edf2f7] hover:bg-[#e2e8f0] py-1 border-gray-300 border-[1px]'
      >
        <>
          <div className='flex gap-2 flex-wrap'>
            {isMulti && typeof current === 'object' ? (
              current.length > 0 ? (
                current.map((props, i) => (
                  <Badge
                    key={props.value}
                    variant='outline'
                    display='flex'
                    alignItems='center'
                    colorScheme='blue'
                    columnGap={2}
                    py={0.5}
                    px={2}
                    _hover={{ bg: 'highlight' }}
                    onClick={(e) => handleDelete(e, i)}
                  >
                    <Item className='mr-3 w-5 h-5 object-cover rounded-full' {...props} />
                    <Icon className='text-black' icon='akar-icons:cross' />
                  </Badge>
                ))
              ) : (
                <>Select</>
              )
            ) : (
              <Item
                className={
                  type === 'normal' ? 'mr-4 w-4 h-4' : 'mr-4 w-6 h-6 object-cover rounded-full'
                }
                {...list[current as number]}
              />
            )}
          </div>
          <Icon icon='la:angle-down' />
        </>
      </button>
      {on && (
        <ul className='absolute  w-full top-9 z-10 bg-white py-2 rounded-[3px] shadow-md'>
          {localList.length > 0 ? (
            localList.map((props, idx) => (
              <li
                key={props.text}
                onClick={handleSelect(idx)}
                className='px-4 py-2 hover:bg-[#e2e8f0] cursor-pointer'
              >
                <Item
                  className={
                    type === 'normal' ? 'mr-4 w-4 h-4' : 'mr-4 w-6 h-6 object-cover rounded-full'
                  }
                  {...props}
                />
              </li>
            ))
          ) : (
            <span className='text-center block my-2'>no member left</span>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropDown;

type Category = { text: string; icon?: string; value: number };

// helper

const modifyItems = (idx: number, list: Category[], resultList: Category[]) => {
  const clone = list.slice(0);
  const deleted = clone.splice(idx, 1)[0];
  const result = [...resultList, deleted];
  return [clone, result];
};
