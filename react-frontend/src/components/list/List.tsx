import Issue from '../issue/Issue';
import DroppableWrapper from '../dnd/DroppableWrapper';
import DraggableWrapper from '../dnd/DraggableWrapper';
import type { Issue as ApiIssue, List as LIST } from '../../api/apiTypes';
import { ChakraProvider, IconButton, Input } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDeleteListMutation, useUpdateListMutation } from '../../api/lists.endpoint';

interface Props extends LIST {
  idx: number;
  issues?: ApiIssue[];
}

const List = (props: Props) => {
  const { idx, name: NAME, id, projectId, issues } = props;
  const [deleteList] = useDeleteListMutation();
  const [name, setName] = useState(NAME);
  const [isEditing, setIsEditing] = useState(false);
  const [updateList] = useUpdateListMutation();

  const handleUpdateList = () => {
    // when the user saves
    if (isEditing && name !== NAME) {
      updateList({ listId: id, body: { projectId, name } });
    }
    setIsEditing((p) => !p);
  };

  return (
    <DraggableWrapper
      className='w-[clamp(16rem,18rem,20rem)]'
      index={idx}
      draggableId={'list-' + id}
    >
      <div className='relative mr-3 bg-light-c-2 p-3 shadow-light-list'>
        <div className='mb-4 text-[15px] flex justify-between items-center'>
          <div className='flex item-center'>
            <div className='relative'>
              {isEditing ? (
                <ChakraProvider>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size='xs'
                    fontSize={15}
                    autoFocus
                  />
                </ChakraProvider>
              ) : (
                <span className='pl-2 block font-medium border-[1px] border-transparent'>
                  {name}
                </span>
              )}
            </div>
            <span className='mx-2 text-gray-500'>|</span>
            <span className='font-bold text-gray-600 pt-[1px]'>{issues ? issues.length : 0}</span>
          </div>
          <div className='flex gap-2'>
            <ChakraProvider>
              {isEditing && (
                <IconButton
                  p={1}
                  minW='none'
                  h='auto'
                  ml={5}
                  icon={<Icon icon='bx:trash' className='text-red-500' />}
                  aria-label='delete list'
                  onClick={() => deleteList({ listId: id, projectId })}
                />
              )}
              <IconButton
                p={1}
                minW='none'
                h='auto'
                icon={<Icon icon='akar-icons:edit' />}
                aria-label='edit list'
                onClick={handleUpdateList}
              />
            </ChakraProvider>
          </div>
        </div>
        <DroppableWrapper className='min-h-[3rem]' type='issue' droppableId={'list-' + id}>
          {issues?.map((data, i) => (
            <Issue {...data} key={data.id} listId={id} listIdx={idx} idx={i} />
          ))}
        </DroppableWrapper>
      </div>
    </DraggableWrapper>
  );
};

export default List;
