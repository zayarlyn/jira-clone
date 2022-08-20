import { Droppable } from '@hello-pangea/dnd';

const DroppableWrapper = ({ children: CH, className, droppableId, type }: DROP) => {
  return (
    <Droppable  type={type} droppableId={droppableId}>
      {(provided) => (
        <div className={className} ref={provided.innerRef} {...provided.droppableProps}>
          {CH}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableWrapper;

type DROP = {
  children: React.ReactNode;
  className?: string;
  droppableId: string;
  type: string;
};
