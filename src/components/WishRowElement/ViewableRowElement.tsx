import { Box, Card, Checkbox } from "@mui/material";
import { WishType } from "../WitshList/items";
import { ViewLabel } from "./ViewLabel";

export const ViewableRowElement = ({
  wish,
  handleToggle
}: {
  wish: WishType;
  handleToggle: (id: number) => void;
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 1,
        my: 1,
        borderRadius: 0,
        border: "2px solid",
        boxShadow: `7px 7px ${wish.color}, 7px 7px 0px 2px #171d21`
      }}
    >
      <Box sx={{ p: 1 }} display="flex" alignItems="center">
        <ViewLabel label={wish.title} url={wish.url} />
        <Box flexGrow={1} />
        <Checkbox
          color="default"
          checked={!wish.available}
          onChange={() => handleToggle(wish.id)}
        />
      </Box>
    </Card>
  );
};
