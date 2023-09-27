import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import * as React from "react";
import { Wish, mapWishesToUI } from "~/domain/wishes";
import { useUser } from "~/pages/profile";
import { api } from "~/utils/api";
import { Toogle } from "../Switch";

export function AddNewWish({ position = 0 }: { position?: number }) {
  const [open, setOpen] = React.useState(false);
  const session = useSession();

  const { wishes, handleChange } = useUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addWish = api.wishes.create.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = session.data?.user as User;
    if (!user) return;

    const data = new FormData(event.currentTarget);

    const url = data.get("url") as string;

    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$"
    );

    if (!urlRegex.test(url)) {
      alert("Url is not valid");
      return;
    }

    const json = Object.fromEntries(data.entries());
    const body = {
      ...json,
      active: json.active === "on",
      available: json.available === "on",
      receiverId: user.id,
      position
    } as Omit<Wish, "id">;

    await addWish.mutateAsync(
      { ...body },
      {
        onSuccess: (data) => {
          const newWishes = wishes ? [...wishes, data as Wish] : [data as Wish];
          const formatedWishes = mapWishesToUI(newWishes);
          handleChange({
            wishes: formatedWishes
          });
          setOpen(false);
        },
        onError: () => {
          setOpen(false);
          alert("Something went wrong, please try again");
        }
      }
    );
  };

  return (
    <>
      <Button
        disableElevation
        variant="contained"
        onClick={handleClickOpen}
        sx={{ px: 4 }}
      >
        Add new wish
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form noValidate={false} onSubmit={handleSubmit}>
          <DialogTitle gutterBottom>Create new item</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ px: 2 }}>
            <TextField
              fullWidth
              required
              label="Name"
              id="outlined-basic"
              variant="outlined"
              name="title"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              required
              label="Url"
              name="url"
              id="outlined-basic"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Toogle name="active" sx={{ m: 1 }} defaultChecked />}
              label={
                <Tooltip
                  arrow
                  title="This means that it will be shown publicly"
                >
                  <Box display="flex" alignItems="center">
                    <Typography>Active</Typography>
                    <InfoOutlinedIcon fontSize="small" />
                  </Box>
                </Tooltip>
              }
            />
            {/*Next version*/}
            {/*<FormControlLabel
              control={<Toogle name="available" sx={{ m: 1 }} defaultChecked />}
              label={
                <Tooltip
                  arrow
                  title="This means whether it can be selected to be gift or not"
                >
                  <Box display="flex" alignItems="center">
                    <Typography>Available</Typography>
                    <InfoOutlinedIcon fontSize="small" />
                  </Box>
                </Tooltip>
              }
            />*/}
          </DialogContent>
          <DialogActions>
            <Button
              disableElevation
              variant="contained"
              autoFocus
              type="submit"
            >
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
