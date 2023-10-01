import { useUser } from "~/pages/profile";
import { api } from "~/utils/api";
import { useSelectedContext } from "./useSelectedIds";

export const useRemoveSelected = () => {
  const { wishes, handleChange } = useUser();
  const { selectedIds, reset } = useSelectedContext();

  const { mutateAsync, isLoading, isError } = api.wishes.delete.useMutation();

  const handleRemoveSelected = () => {
    const newList = wishes?.filter(
      (wish) => !selectedIds.includes(wish.id.toString())
    );

    try {
      handleChange({ wishes: newList });
      mutateAsync(selectedIds, {
        onError: (error) => {
          alert(error.message);
          handleChange({ wishes });
        },
        onSuccess: () => {
          alert("Wishes removed");
          reset();
        }
      });
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return { handleRemoveSelected, isLoading, isError };
};
