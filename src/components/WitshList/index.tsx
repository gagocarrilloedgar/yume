import React from "react";

import { Box, Stack } from "@mui/material";

import { DropResult } from "@hello-pangea/dnd";
import { DndContext, Draggable, Droppable } from "~/components/DragAndDrop";
import { COLORS } from "~/theme";
import { Avatar } from "../Avatar";
import { EditableRowElement, ViewableRowElement } from "../WishRowElement";
import { WishType, wishList } from "./items";

export function WishList({ isPublic = false }: { isPublic?: boolean }) {
  const shuffledColors = shuffleArray(Object.values(COLORS));

  const [state, setState] = React.useState(() =>
    wishList.map((wish, index) => ({
      ...wish,
      isEditing: false,
      color: shuffledColors[index % shuffledColors.length]
    }))
  );

  const toogleValue = (id: number, key: keyof WishType) => {
    const newList = state.map((wish) => {
      if (wish.id === id) return { ...wish, [key]: !wish[key] };

      return wish;
    });
    setState(newList);
  };

  const toogleActive = (id: number) => toogleValue(id, "isActive");
  const toogleAvailable = (id: number) => toogleValue(id, "available");

  const handleChange = (key: keyof WishType, id: number, value: string) => {
    const newList = state.map((wish) => {
      if (wish.id === id) {
        return {
          ...wish,
          [key]: value
        };
      }
      return wish;
    });
    setState(newList);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedWishList = [...state] as WishType[];
    const [reorderedItem] = reorderedWishList.splice(result.source.index, 1);
    reorderedWishList.splice(result.destination.index, 0, reorderedItem!);
    setState(reorderedWishList);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Avatar />
      <DndContext onDragEnd={onDragEnd}>
        <Droppable disabled={isPublic}>
          <Stack spacing={4}>
            {state.map((whish, index) => (
              <Draggable
                disabled={isPublic}
                key={whish.id.toString()}
                id={whish.id.toString()}
                index={index}
              >
                {!isPublic ? (
                  <ViewableRowElement
                    wish={whish as WishType}
                    handleToggle={toogleAvailable}
                  />
                ) : (
                  <EditableRowElement
                    wish={whish as WishType}
                    toogleActive={toogleActive}
                    handleChange={handleChange}
                  />
                )}
              </Draggable>
            ))}
          </Stack>
        </Droppable>
      </DndContext>
    </Box>
  );
}

function shuffleArray(array: string[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
