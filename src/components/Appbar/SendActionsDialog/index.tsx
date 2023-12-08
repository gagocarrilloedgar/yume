import {
  Box,
  Button,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { COLORS, iconButtonStyle } from "../common";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useRouter } from "next/router";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function SendActionsDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <IconButton
        size="small"
        aria-label="Share"
        type="button"
        onClick={handleClickOpen}
        {...iconButtonStyle}
      >
        <SendOutlinedIcon />
      </IconButton>

      <SimpleDialog
        selectedValue={selectedValue as string}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props: Readonly<SimpleDialogProps>) {
  const { onClose, selectedValue, open } = props;
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  const { username } = router.query;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://yume.io/${username}`);
    setCopied(true);
    setCopiedTimeout();
  };

  const setCopiedTimeout = () => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">Share this wish list</DialogTitle>
      <DialogContent>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#0000",
            boxShadow: `7px 7px ${COLORS.greenAction}, 7px 7px 0px 2px #171d21`
          }}
          onClick={copyToClipboard}
          fullWidth
        >
          <Box
            display="flex"
            flexDirection="row"
            alignContent="center"
            justifyItems="space-between"
          >
            <Typography
              variant="body2"
              sx={{ p: 1, textTransform: "lowercase" }}
            >
              yume.io/{username}
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                p: 1,
                fontWeight: "bold"
              }}
              variant="body2"
            >
              {copied ? "Copied!" : "Copy"}
            </Typography>
          </Box>
        </Button>
      </DialogContent>

      <Divider sx={{ pt: 2 }} />
      <Box>
        <Typography variant="body2" sx={{ p: 2, fontWeight: "bold" }}>
          Create your own wish list to share.
        </Typography>
        <Stack direction="column" spacing={2} sx={{ p: 2 }}>
          <Button
            disableElevation
            variant="contained"
            fullWidth
            href="/login"
          >
            Create an account or sign in
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
