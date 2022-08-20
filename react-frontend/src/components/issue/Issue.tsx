import DraggableWrapper from '../dnd/DraggableWrapper';
const Issue = ({ index, listIndex }: Props) => {
  return (
    <DraggableWrapper
      className='mb-2 w-60 rounded-sm bg-light-c-1 p-2 shadow-light-issue'
      index={index}
      draggableId={['issue', listIndex, index].join('-')}
    >
      <div>
        <span className='text-sm'>{'issue-' + index + ' of list' + listIndex}</span>
      </div>
    </DraggableWrapper>
  );
};

export default Issue;

type Props = {
  listIndex: number;
  index: number;
};
