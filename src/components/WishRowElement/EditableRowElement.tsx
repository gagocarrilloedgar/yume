import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { Box, Card, Tooltip } from "@mui/material";
import { Toogle } from "../Switch";
import { WishType } from "../WitshList/items";
import { EditLabel } from "./EditLabel";

export const EditableRowElement = ({
  wish,
  handleChange,
  toogleActive
}: {
  wish: WishType;
  handleChange: (key: keyof WishType, id: number, title: string) => void;
  toogleActive: (id: number) => void;
}) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange("title", wish.id, e.target.value);

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange("url", wish.id, e.target.value);

  return (
    <Card
      key={wish.id}
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
        <DragIndicatorOutlinedIcon fontSize="medium" sx={{ mr: 2 }} />
        <Box width="100%">
          <EditLabel label={wish.title} onChange={onChangeTitle} name="title" />
          <EditLabel label={wish.url} onChange={onChangeUrl} name="url" />
        </Box>
        <Box flexGrow={1} />
        <Tooltip arrow title={wish.isActive ? "Hide" : "Show"}>
          <Toogle
            checked={wish.isActive}
            onChange={() => toogleActive(wish.id)}
          />
        </Tooltip>
      </Box>
    </Card>
  );
};
