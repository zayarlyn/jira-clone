import { DragDropContext } from '@hello-pangea/dnd';
import type { DragStart, DragUpdate, DropResult } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectLists, setLists, updateListOrder } from '../../features/listSlice';
import { selectIssues, setIssuesInList, updateIssueOrder } from '../../features/issueSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { JiraList } from '../../types';

const Board = () => {
  const { lists } = useAppSelector(selectLists);
  const { issues } = useAppSelector(selectIssues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchLists().then((lists) => {
      dispatch(setLists(lists));
      return Promise.all(
        lists.map(({ id }) =>
          fetchIssuesByListId(id).then((issues) => dispatch(setIssuesInList({ [id]: issues })))
        )
      );
    });
  }, [dispatch]);

  // const { data, isLoading } = useQuery('jiraLists', () => sampleLists);
  const onDragUpdate = (update: DragUpdate) => {};
  const onDragStart = (update: DragStart) => {};

  const onDragEnd = ({ type, source: s, destination: d }: DropResult) => {
    if (!d) return;

    dispatch((type === 'list' ? updateListOrder : updateIssueOrder)({ s, d }));
  };

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

const fetchLists = async () => {
  const { data } = await axios.get('http://localhost:5000/api/projects/1/lists');
  return data as JiraList[];
};
const fetchIssuesByListId = async (id: string) => {
  const { data } = await axios.get(`http://localhost:5000/api/lists/${id}/issues`);
  return data;
};
