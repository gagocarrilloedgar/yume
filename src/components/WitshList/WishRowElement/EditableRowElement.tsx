import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { Box, Card, Checkbox, Tooltip } from "@mui/material";
import { Wish } from "~/domain/wishes";
import { api } from "~/utils/api";
import { Toogle } from "../../Switch";
import { useSelectedContext } from "../RemoveWishes/useSelectedIds";
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
  const { mutateAsync, isLoading } = api.wishes.resolve.useMutation();
  const { mutateAsync: updateWish, isLoading: updateOnGoing } =
    api.wishes.update.useMutation();

  const { selectedIds, handleSelect } = useSelectedContext();
  const isSelected = selectedIds.includes(wish.id);

  const onChangeCheckbox = () => {
    handleSelect(wish.id);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange("title", wish.id, e.target.value);

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange("url", wish.id, e.target.value);

  const handleUpdateToggle = async (id: string) => {
    try {
      toogleActive(id);
      await mutateAsync(
        {
          id,
          active: !wish.active
        },
        {
          onError: (error) => {
            alert(error.message);
            toogleActive(id);
          }
        }
      );
    } catch {
      alert("Something went wrong");
    }
  };

  const handleUpdateWish = async (key: "title" | "url", value?: string) => {
    if (!value && key === "title") return;

    try {
      await updateWish(
        {
          id: wish.id,
          [key]: value || null
        },
        {
          onError: (error) => {
            alert(error.message);
          }
        }
      );
    } catch {
      alert("Something went wrong");
    }
  };

  const updateTitle = (value?: string) => handleUpdateWish("title", value);
  const updateUrl = (value?: string) => handleUpdateWish("url", value);

  return (
    <Card
      key={wish.id}
      variant="outlined"
      sx={{
        p: 1,
        my: 1,
        borderRadius: 0,
        border: "2px solid",
        "&:hover": {
          backgroundColor: "whitesmoke"
        },
        boxShadow: `7px 7px ${wish.color}, 7px 7px 0px 2px #171d21`
      }}
    >
      <Box sx={{ p: 1 }} display="flex" alignItems="center">
        <DragIndicatorOutlinedIcon fontSize="medium" sx={{ mr: 0 }} />
        <Checkbox
          sx={{ mr: 2 }}
          checked={isSelected}
          onChange={onChangeCheckbox}
        />

        <Box width="60%">
          <EditLabel
            label={wish.title}
            updateValue={updateTitle}
            onChange={onChangeTitle}
            name="title"
          />
          <EditLabel
            updateValue={updateUrl}
            placeholder={"Add a url"}
            label={wish.url}
            onChange={onChangeUrl}
            name="url"
          />
        </Box>
        <Box flexGrow={1} />
        <Tooltip arrow title={wish.active ? "Hide" : "Show"}>
          <Toogle
            disabled={isLoading}
            checked={wish.active}
            onChange={() => handleUpdateToggle(wish.id)}
          />
        </Tooltip>
      </Box>
    </Card>
  );
};
