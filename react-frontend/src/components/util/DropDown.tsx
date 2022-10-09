import { Dispatch, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { A, T } from '../issue/CreateIssueModal';
import Item from './Item';

type Prop = {
  list: Category[];
  type: 'normal' | 'multiple';
  variant?: 'normal' | 'small';
  defaultValue?: number | Category[];
  dispatch: Dispatch<A>;
  actionType: T;
  className?: string;
};

function DropDown(props: Prop) {
  const {
    list,
    defaultValue: dv,
    type,
    variant = 'normal',
    dispatch,
    actionType,
    className,
  } = props;
  const isMulti = type === 'multiple';
  const [localList, setLocalList] = useState<Category[]>(
    isMulti ? (dv ? multiDefault(list, dv as Category[]) : list.slice(1)) : list
  );

  const [current, setCurrent] = useState<Category[] | number>(dv || (isMulti ? [list[0]] : 0));
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (dv !== undefined) return;
    const initialValue = list[0].value;
    dispatch({
      type: actionType,
      value: isMulti ? [initialValue] : initialValue,
    });
  }, []);

  const handleSelect = (idx: number) => () => {
    const [clone, resultList] = modifyItems(idx, localList, current as Category[]);
    dispatch({
      type: actionType,
      value: isMulti ? parseIds(resultList) : localList[idx].value,
    });
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
    dispatch({
      type: actionType,
      value: isMulti ? parseIds(clone) : localList[idx].value,
    });
  };

  return (
    <div
      className={`relative text-[15px] font-medium text-black ${
        variant === 'normal' ? '' : 'mb-8'
      }`}
    >
      <button
        onClick={() => setOn((p) => !p)}
        className={`flex items-center justify-between border-gray-300 bg-[#edf2f7] px-4 py-1 tracking-wide hover:bg-[#e2e8f0] ${
          variant === 'normal' ? 'rounded-[4px] border-[1px]' : 'rounded-sm border-none'
        } ${className ?? 'w-full sm:max-w-fit'}`}
      >
        <>
          <div className='flex flex-wrap gap-2'>
            {isMulti && typeof current === 'object' ? (
              current.length > 0 ? (
                current.map((props, i) => (
                  <div
                    key={props.value}
                    className='flex items-center gap-2 border-[1.5px] border-blue-500 px-2 hover:border-green-500'
                    onClick={(e) => handleDelete(e, i)}
                  >
                    <Item size='h-5 w-5' variant={isMulti ? 'ROUND' : 'SQUARE'} {...props} />
                    <Icon className='text-black' icon='akar-icons:cross' />
                  </div>
                ))
              ) : (
                <>Select</>
              )
            ) : (
              <Item size='h-4 w-4' {...list[current as number]} />
            )}
          </div>
          <Icon
            className={`ml-3 ${variant === 'normal' ? '' : 'text-[12px]'}`}
            icon='la:angle-down'
          />
        </>
      </button>
      {on && (
        <ul className='absolute bottom-0 z-10 w-full translate-y-[calc(100%+5px)] rounded-[3px] bg-white py-2 shadow-md'>
          {localList.length > 0 ? (
            localList.map((props, idx) => (
              <li
                className='cursor-pointer px-4 py-2 hover:bg-[#e2e8f0]'
                onClick={(isMulti ? handleSelect : handleClick)(idx)}
                key={props.value}
              >
                <Item
                  size={isMulti ? 'w-6 h-6' : 'w-4 h-4'}
                  variant={isMulti ? 'ROUND' : 'SQUARE'}
                  {...list[current as number]}
                  {...props}
                />
              </li>
            ))
          ) : (
            <span className='my-2 block text-center'>no member left</span>
          )}
        </ul>
      )}
    </div>
  );
}

export default DropDown;

export type Category = { text: string; icon?: string; value: number };

// helpers
const modifyItems = (idx: number, list: Category[], resultList: Category[]) => {
  const clone = list.slice(0);
  const deleted = clone.splice(idx, 1)[0];
  const result = [...resultList, deleted];
  return [clone, result];
};

const parseIds = (ary: Category[]) => ary.map(({ value }) => value);

const multiDefault = (list: Category[], dv: Category[]) =>
  list.filter(({ value: V }) => !(dv as Category[]).some(({ value: v }) => v === V));
