import DraggableWrapper from '../dnd/DraggableWrapper';
import type { JiraIssue } from '../../types';

const Issue = ({ index, listIndex, title, id }: Props) => {
  return (
    <DraggableWrapper
      className='mb-2 w-full rounded-sm bg-light-c-1 p-2 shadow-light-issue'
      index={index}
      draggableId={id}
    >
      <div>
        <span className='text-sm'>{title}</span>
      </div>
    </DraggableWrapper>
  );
};

export default Issue;

interface Props extends JiraIssue {
  listIndex: number;
  index: number;
};
