import Issue from '../issue/Issue';
import DroppableWrapper from '../dnd/DroppableWrapper';
import DraggableWrapper from '../dnd/DraggableWrapper';
import type { List as LIST } from '../../api/apiTypes';
import { selectIssuesArray } from '../../api/issues.endpoint';

interface Props extends LIST {
  index: number;
}

const List = ({ index, name, id }: Props) => {
  const { issues } = selectIssuesArray(id);

  return (
    <DraggableWrapper
      className='w-[clamp(14rem,16rem,18rem)]'
      index={index}
      draggableId={'list-' + id}
    >
      <div className='relative mr-3 bg-light-c-2 p-3 shadow-light-list'>
        <span className='mt-3 mb-5 block text-[15px] font-medium'>{name}</span>
        <DroppableWrapper className='min-h-[3rem]' type='issue' droppableId={'list-' + id}>
          {issues.map((datapoints, n) => (
            <Issue {...datapoints} key={datapoints.id} listIndex={index} index={n} />
          ))}
        </DroppableWrapper>
      </div>
    </DraggableWrapper>
  );
};

export default List;
