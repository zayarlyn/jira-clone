import { useQuery } from 'react-query';
import { DragDropContext } from '@hello-pangea/dnd';
import type { DragStart, DragUpdate, DropResult } from '@hello-pangea/dnd';
import DraggableWrapper from '../dnd/DraggableWrapper';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
// import { sampleLists } from '../../testData';
// import { client } from '../../App';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectLists, updateListOrder } from '../../features/listSlice';
import { selectIssues, updateIssueOrder } from '../../features/issueSlice';

const Board = () => {
  const { lists } = useAppSelector(selectLists);
  const dispatch = useAppDispatch();

  // const { data, isLoading } = useQuery('jiraLists', () => sampleLists);
  const onDragUpdate = (update: DragUpdate) => {};
  const onDragStart = (update: DragStart) => {};

  const did = {
    draggableId: 'dnd-list-0',
    type: 'board',
    source: {
      index: 0,
      droppableId: 'board-central',
    },
    reason: 'DROP',
    mode: 'FLUID',
    destination: {
      droppableId: 'board-central',
      index: 1,
    },
    combine: null,
  };
  const onDragEnd = ({ type, source: s, destination: d }: DropResult) => {
    console.log(s, d, type);
    if (!d) return;

    dispatch((type === 'list' ? updateListOrder : updateIssueOrder)({ s, d }));
  };

  // if (isLoading) return <div>loading...</div>;

  return (
    <div className='grow px-10 min-w-max'>
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
        <DroppableWrapper
          type='list'
          className='flex items-start'
          droppableId='board-central'
          direction='horizontal'
        >
          {lists?.map((datapoints, n) => (
            <List key={datapoints.id} index={n} {...datapoints} />
          ))}
        </DroppableWrapper>
      </DragDropContext>
    </div>
  );
};

export default Board;
