import DraggableWrapper from '../dnd/DraggableWrapper';
import { Issue as JiraIssue } from '../../api/apiTypes';
import { types, priorities } from '../../category';
import { selectMembers } from '../../api/member.endpoint';
import AssignedMembers from './AssignedMembers';
import { lazy, Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
const IssueModelHOC = lazy(() => import('./IssueModelHOC'));
const IssueDetailModal = lazy(() => import('./IssueDetailModal'));

const Issue = (props: Props) => {
  const { listId, listIdx, idx, summary, id, type, priority, assignees } = props;
  const [isOpen, setIsOpen] = useState(false);
  const projectId = Number(useParams().projectId);
  const { members } = selectMembers(projectId);
  const { icon, text } = priorities[priority];

  if (!members) return null;

  return (
    <>
      <DraggableWrapper
        className='mb-2 w-full rounded-sm bg-c-1 p-2 shadow-issue hover:bg-c-4'
        index={idx}
        draggableId={'issue-' + id}
      >
        <div onClick={() => setIsOpen(true)}>
          <span className=''>{summary}</span>
          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center gap-3'>
              <img className='w-[18px] h-[18px]' src={types[type].icon} alt={types[type].text} />
              <img className='w-[18px] h-[18px]' src={icon} alt={text} />
            </div>
            <AssignedMembers assignees={assignees} members={members} />
          </div>
        </div>
      </DraggableWrapper>
      {isOpen && (
        <Suspense fallback={null}>
          <IssueModelHOC
            children={IssueDetailModal}
            onClose={() => setIsOpen(false)}
            issue={{ listId, listIdx, idx }}
          />
        </Suspense>
      )}
    </>
  );
};

export default Issue;

interface Props extends JiraIssue {
  listId: number;
  listIdx: number;
  idx: number;
}
