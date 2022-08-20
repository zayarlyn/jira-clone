import { DragDropContext, DragStart, DragUpdate } from '@hello-pangea/dnd';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';

const Project = () => {
  const onDragUpdate = (update: DragUpdate) => {};
  const onDragStart = (update: DragStart) => {};
  return (
    <div className='h-full'>
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={() => {}}>
        <DroppableWrapper
          type='board'
          className='flex items-start gap-4'
          droppableId='board-central'
        >
          {[1, 2, 3].map((n) => (
            <List key={n} index={n} />
          ))}
        </DroppableWrapper>
      </DragDropContext>
    </div>
  );
};

export default Project;
