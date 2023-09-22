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
import { compact } from "~/utils/compact";
import { Toogle } from "../Switch";

export function AddNewWish({ position = 0 }: { position?: number }) {
  const [open, setOpen] = React.useState(false);
  const session = useSession();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = session.data?.user as User;
    if (!user) return;

    const data = new FormData(event.currentTarget);
    const compacted = compact(data);

    // Get json from form data
    const json = Object.fromEntries(data.entries());
    const body = {
      ...json,
      active: json.active === "on",
      available: json.available === "on",
      receiverId: user.id,
      position
    };

    await fetch("/api/wishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    setOpen(false);

    if (!compacted) return;
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
            <FormControlLabel
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
            />
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
