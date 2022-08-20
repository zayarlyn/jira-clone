import { Draggable } from '@hello-pangea/dnd';

const DraggableWrapper = ({ children: CH, className, index, draggableId }: DROP) => {
  return (
    <Draggable {...{index, draggableId}}>
      {({ innerRef, dragHandleProps, draggableProps }) => (
        <div className={className} ref={innerRef} {...dragHandleProps} {...draggableProps}>
          {CH}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableWrapper;

type DROP = {
  children: React.ReactNode;
  className?: string;
  draggableId: string;
  index: number;
};
