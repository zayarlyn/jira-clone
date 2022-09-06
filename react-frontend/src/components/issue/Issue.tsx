import DraggableWrapper from '../dnd/DraggableWrapper';
import { Issue as JiraIssue } from '../../api/apiTypes';
import { types, priorities } from '../../category';
import { selectMembers } from '../../api/project.endpoint';
import AssignedMembers from './AssignedMembers';
import { useState } from 'react';
import IssueModelHOC from './IssueModelHOC';
import IssueDetailModel from './IssueDetailModel';

const Issue = (props: Props) => {
  const { index, summary, id, type, priority, assignees } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { members } = selectMembers(1);
  const { icon, text } = priorities[priority];

  if (!members || !assignees) return null;

  return (
    <>
      <DraggableWrapper
        className='mb-2 w-full rounded-sm bg-light-c-1 p-2 shadow-light-issue hover:bg-light-c-5'
        index={index}
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
      {isOpen && <IssueModelHOC render={IssueDetailModel} {...{ isOpen, setIsOpen }} />}
    </>
  );
};

export default Issue;

interface Props extends JiraIssue {
  listIndex: number;
  index: number;
}
