import { DragDropContext, DragStart, DragUpdate } from '@hello-pangea/dnd';
import DraggableWrapper from '../dnd/DraggableWrapper';
import DroppableWrapper from '../dnd/DroppableWrapper';
import List from '../list/List';

const Board = () => {
  const onDragUpdate = (update: DragUpdate) => {};
  const onDragStart = (update: DragStart) => {};

  return (
    <div className='grow px-10'>
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={() => {}}>
        <DroppableWrapper
          type='board'
          className='flex items-start'
          droppableId='board-central'
          direction='horizontal'
        >
          {[1, 2, 3, 4].map((n) => (
            <DraggableWrapper index={n} draggableId={'dnd-list-' + n}>
              <List key={n} index={n} />
            </DraggableWrapper>
          ))}
        </DroppableWrapper>
      </DragDropContext>
    </div>
  );
};

export default Board;
