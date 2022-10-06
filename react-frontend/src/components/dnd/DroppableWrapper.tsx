import { Direction, Droppable } from "@hello-pangea/dnd";

const DroppableWrapper = ({
  children: CH,
  className,
  droppableId,
  type,
  direction,
}: DROP) => {
  return (
    <Droppable direction={direction} type={type} droppableId={droppableId}>
      {(provided) => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
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
  direction?: Direction;
};
