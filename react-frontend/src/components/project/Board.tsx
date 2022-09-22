import { DragDropContext, DraggableLocation } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
import { useReorderIssuesMutation } from '../../api/issues.endpoint';
import { useCreateListMutation, useReorderListsMutation } from '../../api/lists.endpoint';
import type { Issues, List as ApiList } from '../../api/apiTypes';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface Props {
  lists?: ApiList[];
  issues?: Issues;
}

const Board = (props: Props) => {
  const { lists, issues } = props;
  const [reorderLists] = useReorderListsMutation();
  const [reorderIssues] = useReorderIssuesMutation();
  const [createList] = useCreateListMutation();
  const projectId = Number(useParams().projectId);

  if (!lists) return null;

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
      : // console.log('opeartion reorder');
        reorderIssues({
          id: issues[parseId(s)][s.index].id,
          s: { sId: parseId(s), order: s.index + 1 }, // change index to actual order
          d: { dId: parseId(d), newOrder: d.index + 1 }, // change index to actual order
          projectId,
        });
  };

  const handleCreateList = () => {
    createList({ projectId });
  };

  return (
    <div className='grow px-10 min-w-max flex items-start'>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableWrapper
          type='list'
          className='flex items-start'
          droppableId='board-central'
          direction='horizontal'
        >
          {lists.map((props, i) => (
            <List key={props.id} idx={i} issues={issues?.[props.id]} {...props} />
          ))}
        </DroppableWrapper>
        <button
          onClick={handleCreateList}
          className='bg-light-c-2 hover:bg-[#eef1f7] active:bg-blue-100 py-3 px-14 rounded-md flex items-center gap-5'
        >
          Create a list <Icon icon='ant-design:plus-outlined' />
        </button>
      </DragDropContext>
    </div>
  );
};

export default Board;

// helpers
const parseId = (dndObj: DraggableLocation) => +dndObj.droppableId.split('-')[1];
