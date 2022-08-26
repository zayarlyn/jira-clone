import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
import {
  useIssuesQuery,
  useListsQuery,
  useReorderIssuesMutation,
  useReorderListsMutation,
} from '../../api/jiraAPI';

const Board = () => {
  const { data: lists, isSuccess: listsFetched } = useListsQuery();
  const { data: issues, isSuccess: issuesFetched } = useIssuesQuery();
  const [reorderLists] = useReorderListsMutation();
  const [reorderIssues] = useReorderIssuesMutation();

  const onDragEnd = ({ type, source: s, destination: d }: DropResult) => {
    if (!lists! || !issues || !d || (s.droppableId === d.droppableId && s.index === d.index))
      return;
    type === 'list'
      ? reorderLists({
          id: lists[s.index].id,
          order: s.index + 1,
          newOrder: d.index + 1,
          projectId: 1,
        })
      : reorderIssues({
          id: issues[+s.droppableId.split('-')[1]][s.index].id,
          s: { sId: +s.droppableId.split('-')[1], order: s.index + 1 },
          d: { dId: +d.droppableId.split('-')[1], newOrder: d.index + 1 },
          projectId: 1,
        });
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
          {listsFetched &&
            lists.map((datapoints, n) => <List key={datapoints.id} index={n} {...datapoints} />)}
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
