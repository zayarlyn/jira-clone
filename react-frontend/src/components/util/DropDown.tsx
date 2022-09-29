import { Badge, ChakraProvider } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { Dispatch, useEffect, useState } from 'react';
import { A, T } from '../issue/CreateIssueModal';
import Item from './Item';

type Prop = {
  list: Category[];
  type: 'normal' | 'multiple';
  variant?: 'normal' | 'small';
  defaultValue?: number | Category[];
  dispatch: Dispatch<A>;
  actionType: T;
};

const parseIds = (ary: Category[]) => ary.map(({ value }) => value);

const DropDown = (props: Prop) => {
  const { list, defaultValue, type, variant = 'normal', dispatch, actionType } = props;
  const isMulti = type === 'multiple';
  const [localList, setLocalList] = useState<Category[]>(
    isMulti
      ? defaultValue
        ? list.filter(
            ({ value }) => !(defaultValue as Category[]).some(({ value: v }) => v === value)
          )
        : list.slice(1)
      : list
  );
  const [current, setCurrent] = useState<Category[] | number>(
    defaultValue || (isMulti ? [list[0]] : 0)
  );
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) return;
    console.log('default', defaultValue);
    const initialValue = list[0].value;
    dispatch({ type: actionType, value: isMulti ? [initialValue] : initialValue });
  }, []);

  const handleSelect = (idx: number) => () => {
    const [clone, resultList] = modifyItems(idx, localList, current as Category[]);
    dispatch({ type: actionType, value: isMulti ? parseIds(resultList) : localList[idx].value });
    setLocalList(clone);
    setCurrent(resultList);
    setOn(false);
  };

  const handleClick = (idx: number) => () => {
    if (idx === current) return setOn(false);
    setCurrent(idx);
    dispatch({ type: actionType, value: localList[idx].value });
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
    <div
      className={`relative text-black text-[15px] font-medium ${
        variant === 'normal' ? '' : 'mb-8'
      }`}
    >
      <button
        onClick={() => setOn((p) => !p)}
        className={`flex items-center justify-between tracking-wide px-4 bg-[#edf2f7] hover:bg-[#e2e8f0] py-1 border-gray-300 ${
          variant === 'normal'
            ? 'border-[1px] rounded-[4px] w-full'
            : 'border-none rounded-sm w-fit'
        }`}
      >
        <>
          <div className='flex gap-2 flex-wrap'>
            {isMulti && typeof current === 'object' ? (
              current.length > 0 ? (
                <ChakraProvider>
                  {current.map((props, i) => (
                    <Badge
                      key={props.value}
                      variant='outline'
                      display='flex'
                      alignItems='center'
                      colorScheme='blue'
                      columnGap={2}
                      py={0.5}
                      px={2}
                      textColor='black'
                      _hover={{ bg: 'highlight' }}
                      onClick={(e) => handleDelete(e, i)}
                    >
                      <Item className='mr-3 w-5 h-5 object-cover rounded-full' {...props} />
                      <Icon className='text-black' icon='akar-icons:cross' />
                    </Badge>
                  ))}
                </ChakraProvider>
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
          <Icon
            className={`ml-3 ${variant === 'normal' ? '' : 'text-[12px]'}`}
            icon='la:angle-down'
          />
        </>
      </button>
      {on && (
        <ul className='absolute w-full bottom-0 z-10 translate-y-[calc(100%+5px)] bg-white py-2 rounded-[3px] shadow-md'>
          {localList.length > 0 ? (
            localList.map((props, idx) => (
              <li
                key={props.value}
                onClick={(isMulti ? handleSelect : handleClick)(idx)}
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

export type Category = { text: string; icon?: string; value: number };

// helper
const modifyItems = (idx: number, list: Category[], resultList: Category[]) => {
  const clone = list.slice(0);
  const deleted = clone.splice(idx, 1)[0];
  const result = [...resultList, deleted];
  return [clone, result];
};
