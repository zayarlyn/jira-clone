import { DragDropContext, DraggableLocation } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
import { useReorderIssuesMutation } from '../../api/endpoints/issues.endpoint';
import { useCreateListMutation, useReorderListsMutation } from '../../api/endpoints/lists.endpoint';
import type { Issues, List as ApiList } from '../../api/apiTypes';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';

interface Props {
  lists: ApiList[];
  issues?: Issues;
  isDragDisabled: boolean;
}

const Board = (props: Props) => {
  const { lists, issues, isDragDisabled } = props;
  const [reorderLists] = useReorderListsMutation();
  const [reorderIssues] = useReorderIssuesMutation();
  const [createList, { isLoading }] = useCreateListMutation();
  const projectId = Number(useParams().projectId);

  const onDragEnd = ({ type, source: s, destination: d }: DropResult) => {
    if (!lists! || !issues || !d || (s.droppableId === d.droppableId && s.index === d.index))
      return;
    type === 'list'
      ? reorderLists({
          id: lists[s.index].id,
          order: s.index + 1, // change index to actual order
          newOrder: d.index + 1, // change index to actual order
          projectId,
        })
      : reorderIssues({
          id: issues[parseId(s)][s.index].id,
          s: { sId: parseId(s), order: s.index + 1 }, // change index to actual order
          d: { dId: parseId(d), newOrder: d.index + 1 }, // change index to actual order
          projectId,
        });
  };

  const handleCreateList = async () => {
    await createList({ projectId });
    toast('Created a list!');
  };

  return (
    <div className='mb-5 flex min-w-max grow items-start'>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableWrapper
          type='list'
          className='flex items-start'
          droppableId='board-central'
          direction='horizontal'
        >
          {lists.map((props, i) => (
            <List
              key={props.id}
              idx={i}
              issues={issues?.[props.id]}
              isDragDisabled={isDragDisabled}
              {...props}
            />
          ))}
        </DroppableWrapper>
        <button
          onClick={handleCreateList}
          className='flex items-center gap-5 rounded-md bg-c-2 py-3 px-14 text-c-5 hover:bg-c-6 active:bg-blue-100'
        >
          {isLoading ? (
            'creating ...'
          ) : (
            <>
              Create a list <Icon icon='ant-design:plus-outlined' />
            </>
          )}
        </button>
      </DragDropContext>
    </div>
  );
};

export default Board;

// helpers
const parseId = (dndObj: DraggableLocation) => +dndObj.droppableId.split('-')[1];
