import { DragDropContext, DraggableLocation } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
import { useIssuesQuery, useReorderIssuesMutation } from '../../api/issues.endpoint';
import { useListsQuery, useReorderListsMutation } from '../../api/lists.endpoint';
import CreateIssueModel from '../issue/CreateIssueModel';
import type { Issues, List as ApiList } from '../../api/apiTypes';
import { useParams } from 'react-router-dom';

interface Props {
  lists: ApiList[];
  issues: Issues;
  // listsAreReady: boolean;
  // issuesAreReady: boolean;
}

const Board = (props: Props) => {
  const { lists, issues } = props;
  const [reorderLists] = useReorderListsMutation();
  const [reorderIssues] = useReorderIssuesMutation();
  const { projectId } = useParams();

  const onDragEnd = ({ type, source: s, destination: d }: DropResult) => {
    if (!lists! || !issues || !d || (s.droppableId === d.droppableId && s.index === d.index))
      return;
    type === 'list'
      ? reorderLists({
          id: lists[s.index].id,
          order: s.index + 1, // change index to actual order
          newOrder: d.index + 1, // change index to actual order
          projectId: 1,
        })
      : reorderIssues({
          id: issues[parseId(s)][s.index].id,
          s: { sId: parseId(s), order: s.index + 1 }, // change index to actual order
          d: { dId: parseId(d), newOrder: d.index + 1 }, // change index to actual order
          projectId: Number(projectId),
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
          {lists.map((props, n) => (
            <List key={props.id} index={n} issues={issues[props.id]} {...props} />
          ))}
        </DroppableWrapper>
      </DragDropContext>
    </div>
  );
};

export default Board;

// helpers
const parseId = (dndObj: DraggableLocation) => +dndObj.droppableId.split('-')[1];
