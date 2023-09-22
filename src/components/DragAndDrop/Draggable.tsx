import { Draggable as DraggableComponent } from "@hello-pangea/dnd";
import React from "react";

export const Draggable = ({
  id,
  index,
  disabled = false,
  children
}: React.PropsWithChildren<{
  id: string;
  disabled?: boolean;
  index: number;
}>) => {
  return (
    <DraggableComponent
      isDragDisabled={disabled}
      key={id}
      draggableId={id}
      index={index}
    >
      {(provided: any) => (
        <span
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </span>
      )}
    </DraggableComponent>
  );
};
