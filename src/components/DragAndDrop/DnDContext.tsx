

import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import React from "react";

export const DndContext = ({
  onDragEnd,
  children
}: React.PropsWithChildren<{ onDragEnd: OnDragEndResponder }>) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
