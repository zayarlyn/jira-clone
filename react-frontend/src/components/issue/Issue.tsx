import DraggableWrapper from '../dnd/DraggableWrapper';
import { Issue as JiraIssue } from '../../api/apiTypes';
import { types, priorities } from '../../category';
import { selectMembers } from '../../api/project.endpoint';
import AssignedMembers from './AssignedMembers';

const Issue = (props: Props) => {
  const { index, summary, id, type, priority, assignees } = props;
  const { members } = selectMembers(1);

  if (!members || !assignees) return null;

  return (
    <DraggableWrapper
      className='mb-2 w-full rounded-sm bg-light-c-1 p-2 shadow-light-issue'
      index={index}
      draggableId={'issue-' + id}
    >
      <div>
        <span className=''>{summary}</span>
        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center gap-3'>
            <img className='w-[18px] h-[18px]' src={types[type].icon} alt={types[type].text} />
            <img
              className='w-[18px] h-[18px]'
              src={priorities[priority].icon}
              alt={priorities[priority].text}
            />
          </div>
          <AssignedMembers assignees={assignees} members={members} />
        </div>
      </div>
    </DraggableWrapper>
  );
};

export default Issue;

interface Props extends JiraIssue {
  listIndex: number;
  index: number;
}
