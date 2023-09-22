import { Droppable as DroppableComponent } from "@hello-pangea/dnd";
import React from "react";

export const Droppable = ({
  children,
  disabled = false
}: React.PropsWithChildren<{ disabled?: boolean }>) => {
  return (
    <DroppableComponent
      isDropDisabled={disabled}
      droppableId="droppable"
      type="column"
    >
      {(provided: any) => (
        <section {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </section>
      )}
    </DroppableComponent>
  );
};
