import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { COLORS } from "~/theme";
import { useRemoveSelected } from "./useRemove";
import { useSelectedContext } from "./useSelectedIds";

export const RemoveWishes = () => {
  const { selectedIds } = useSelectedContext();
  const { handleRemoveSelected, isLoading } = useRemoveSelected();

  const show = selectedIds.length > 0;

  const removeWishes = () => {
    if (!selectedIds.length) return alert("Select a wish to remove");

    handleRemoveSelected();
  };

  return (
    show && (
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <LoadingButton
          disabled={!selectedIds.length}
          loading={isLoading}
          onClick={removeWishes}
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "#fff",
            boxShadow: `4px 4px ${COLORS.secondaryOrange}, 4px 4px 0px 2px #171d21`
          }}
        >
          Remove
        </LoadingButton>
      </Box>
    )
  );
};
