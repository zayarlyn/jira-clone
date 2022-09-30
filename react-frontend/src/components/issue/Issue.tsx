import DraggableWrapper from '../dnd/DraggableWrapper';
import { Issue as JiraIssue } from '../../api/apiTypes';
import { types, priorities } from '../../category';
import { selectMembers } from '../../api/member.endpoint';
import AssignedMembers from './AssignedMembers';
import { useState } from 'react';
import IssueModelHOC from './IssueModelHOC';
import IssueDetailModal from './IssueDetailModal';
import { useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';

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
        className='mb-2 w-full rounded-sm bg-c-1 p-2 shadow-issue hover:bg-c-5'
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
        <IssueModelHOC
          children={IssueDetailModal}
          onClose={() => setIsOpen(false)}
          issue={{ listId, listIdx, idx }}
        />
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
