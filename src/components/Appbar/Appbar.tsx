import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { AppBar, Box, Button, Container, IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import { AddNewWish } from "../AddNewWish";
import {
  BACKGROUND,
  COLORS,
  editConnectStyle,
  iconButtonStyle
} from "./common";

export const Privatebar = () => {
  const previewMode = !usePathname().includes("/profile");

  return (
    <AppBar
      color="inherit"
      elevation={0}
      variant="elevation"
      sx={{ backgroundColor: BACKGROUND }}
    >
      <Container maxWidth="md">
        <Box display="flex" sx={{ pt: 2 }}>
          {previewMode ? (
            <Button href="/profile" {...editConnectStyle(COLORS.white)}>
              Edit
            </Button>
          ) : (
            <Button href="/" {...editConnectStyle(COLORS.secondaryViolet)}>
              Preview
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            {previewMode ? (
              <IconButton
                size="small"
                aria-label="Share"
                type="button"
                {...iconButtonStyle}
              >
                <SendOutlinedIcon />
              </IconButton>
            ) : (
              <AddNewWish />
            )}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
