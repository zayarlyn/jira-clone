import Issue from '../issue/Issue';
import DroppableWrapper from '../dnd/DroppableWrapper';

const List = ({ index }: Props) => {
  return (
    <div className='relative mr-3 bg-light-c-2 p-3 shadow-light-list'>
      <span className='mt-3 mb-5 block text-sm font-medium'>BACKLOG {index}</span>
      <DroppableWrapper type='list' droppableId={'list-' + index}>
        {[1, 2, 3].map((n, i) => (
          <Issue key={n} listIndex={index} index={n} />
        ))}
      </DroppableWrapper>
    </div>
  );
};

export default List;

type Props = {
  index: number;
};
