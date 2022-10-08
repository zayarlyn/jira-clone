import { lazy, Suspense as S, useState } from 'react';
import { useParams } from 'react-router-dom';
import DraggableWrapper from '../dnd/DraggableWrapper';
import { Issue as JiraIssue } from '../../api/apiTypes';
import { types, priorities } from '../../utils';
import { selectMembers } from '../../api/endpoints/member.endpoint';
import AssignedMembers from './AssignedMembers';
const IssueModelHOC = lazy(() => import('./IssueModelHOC'));
const IssueDetailModal = lazy(() => import('./IssueDetailModal'));

const Issue = (props: Props) => {
  const { listId, listIdx, idx, summary, id, type, priority, assignees, comments, isDragDisabled } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const projectId = Number(useParams().projectId);
  const { members } = selectMembers(projectId);
  const { icon, text } = priorities[priority];

  if (!members) return null;

  return (
    <>
      <DraggableWrapper
        className='hover:bg-c-4 mb-2 w-full rounded-sm bg-c-1 p-2 shadow-issue'
        index={idx}
        draggableId={'issue-' + id}
        isDragDisabled={isDragDisabled}
      >
        <div onClick={() => setIsOpen(true)}>
          <span className=''>{summary}</span>
          <div className='mt-[10px] flex items-center justify-between'>
            <div className='mb-1 flex items-center gap-3'>
              <img className='h-[18px] w-[18px]' src={types[type].icon} alt={types[type].text} />
              <img className='h-[18px] w-[18px]' src={icon} alt={text} />
              {comments > 0 && (
                <span className='block w-6 rounded-md bg-c-2 text-center text-[13px]'>
                  {comments}
                </span>
              )}
            </div>
            <AssignedMembers assignees={assignees} members={members} />
          </div>
        </div>
      </DraggableWrapper>
      {isOpen && (
        <S>
          <IssueModelHOC
            children={IssueDetailModal}
            onClose={() => setIsOpen(false)}
            issue={{ listId, listIdx, idx }}
          />
        </S>
      )}
    </>
  );
};

export default Issue;

interface Props extends JiraIssue {
  listId: number;
  listIdx: number;
  idx: number;
  isDragDisabled: boolean;
}
