import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { Box, Card, Tooltip } from "@mui/material";
import { Wish } from "~/domain/wishes";
import { Toogle } from "../Switch";
import { EditLabel } from "./EditLabel";

export const EditableRowElement = ({
  wish,
  handleChange,
  toogleActive
}: {
  wish: Wish;
  handleChange: (key: keyof Wish, id: string, title: string) => void;
  toogleActive: (id: string) => void;
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
        <Box width="85%">
          <EditLabel label={wish.title} onChange={onChangeTitle} name="title" />
          <EditLabel label={wish.url} onChange={onChangeUrl} name="url" />
        </Box>
        <Box flexGrow={1} />
        <Tooltip arrow title={wish.active ? "Hide" : "Show"}>
          <Toogle
            checked={wish.active}
            onChange={() => toogleActive(wish.id)}
          />
        </Tooltip>
      </Box>
    </Card>
  );
};
