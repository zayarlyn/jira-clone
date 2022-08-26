import { DragDropContext } from '@hello-pangea/dnd';
import type { DragStart, DragUpdate, DropResult } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
import { useListsQuery, useReorderListsMutation } from '../../api/jiraAPI';

const Board = () => {
  const { data, isSuccess } = useListsQuery();
  const [reorderLists] = useReorderListsMutation();

  const onDragEnd = ({ type, source: s, destination: d }: DropResult) => {
    if (!data || !d || (s.droppableId === d.droppableId && s.index === d.index)) return;
    reorderLists({ id: data[s.index].id, order: s.index + 1, newOrder: d.index + 1, projectId: 1 });
  };

  return (
    <div className='grow px-10 min-w-max'>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableWrapper
          type='list'
          className='flex items-start'
          droppableId='board-central'
          direction='horizontal'
        >
          {isSuccess &&
            data.map((datapoints, n) => <List key={datapoints.id} index={n} {...datapoints} />)}
        </DroppableWrapper>
      </DragDropContext>
    </div>
  );
};

export default Board;

// const fetchLists = async () => {
//   const { data } = await axios.get('http://localhost:5000/api/projects/1/lists');
//   return data as JiraList[];
// };
// const fetchIssuesByListId = async (id: string) => {
//   const { data } = await axios.get(`http://localhost:5000/api/lists/${id}/issues`);
//   return data;
// };
