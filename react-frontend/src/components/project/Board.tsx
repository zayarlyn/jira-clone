import { DragDropContext, DraggableLocation } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';
import { useIssuesQuery, useReorderIssuesMutation } from '../../api/issues.endpoint';
import { useListsQuery, useReorderListsMutation } from '../../api/lists.endpoint';
import CreateIssueModel from '../issue/CreateIssueModel';
import type { Issues, List as ApiList } from '../../api/apiTypes';

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
          id: issues[parseId(s)][s.index].id,
          s: { sId: parseId(s), order: s.index + 1 },
          d: { dId: parseId(d), newOrder: d.index + 1 },
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
          {lists.map((datapoints, n) => (
            <List key={datapoints.id} index={n} {...datapoints} />
          ))}
        </DroppableWrapper>
      </DragDropContext>
    </div>
  );
};

export default Board;

// helpers
const parseId = (dndObj: DraggableLocation) => +dndObj.droppableId.split('-')[1];
