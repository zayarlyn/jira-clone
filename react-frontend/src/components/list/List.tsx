import Issue from '../issue/Issue';
import DroppableWrapper from '../dnd/DroppableWrapper';
import type { JiraList } from '../../types';
import { useAppSelector, } from '../../store/hooks';
import { selectIssues } from '../../features/issueSlice';
import DraggableWrapper from '../dnd/DraggableWrapper';

interface Props extends JiraList {
  index: number;
}

const List = ({ index, title, id }: Props) => {
  const { issues } = useAppSelector(selectIssues);

  return (
    <DraggableWrapper className='w-[clamp(14rem,16rem,18rem)]' index={index} draggableId={id}>
      <div className='relative mr-3 bg-light-c-2 p-3 shadow-light-list'>
        <span className='mt-3 mb-5 block text-[15px] font-medium'>{title}</span>
        <DroppableWrapper className='min-h-[3rem]' type='issue' droppableId={id}>
          {issues[id].map((datapoints, n) => (
            <Issue {...datapoints} key={datapoints.id} listIndex={index} index={n} />
          ))}
        </DroppableWrapper>
      </div>
    </DraggableWrapper>
  );
};

export default List;
