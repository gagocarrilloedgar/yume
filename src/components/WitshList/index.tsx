import { Box, Stack } from "@mui/material";

import { DropResult } from "@hello-pangea/dnd";
import { DndContext, Draggable, Droppable } from "~/components/DragAndDrop";
import { Wish } from "~/domain/wishes";
import { useUser } from "~/pages/profile";
import { Avatar } from "../Avatar";
import { EditableRowElement, ViewableRowElement } from "../WishRowElement";

export function WishList({ isPublic = false }: { isPublic?: boolean }) {
  const { user, wishes, handleChange: updateState } = useUser();
  const state = wishes ?? [];

  const toogleValue = (id: string, key: keyof Wish) => {
    const newList = state.map((wish) => {
      if (wish.id === id) return { ...wish, [key]: !wish[key] };

      return wish;
    });
    updateState({ wishes: newList });
  };

  const toogleActive = (id: string) => toogleValue(id, "active");
  const toogleAvailable = (id: string) => toogleValue(id, "available");

  const handleChange = (key: keyof Wish, id: string, value: string) => {
    const newList = state.map((wish) => {
      if (wish.id === id) {
        return {
          ...wish,
          [key]: value
        };
      }
      return wish;
    });
    updateState({ wishes: newList });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedWishList = [...state] as Wish[];
    const [reorderedItem] = reorderedWishList.splice(result.source.index, 1);
    reorderedWishList.splice(result.destination.index, 0, reorderedItem!);
    updateState({ wishes: reorderedWishList });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Avatar isPrivate={!isPublic} user={user!} />
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
                {isPublic ? (
                  <ViewableRowElement
                    wish={whish}
                    handleToggle={toogleAvailable}
                  />
                ) : (
                  <EditableRowElement
                    wish={whish}
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
