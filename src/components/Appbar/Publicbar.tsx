import { AppBar, Box, Button, Container } from "@mui/material";
import SendActionsDialog from "./SendActionsDialog";
import { BACKGROUND, editConnectStyle } from "./common";
import { COLORS } from "~/theme";

export const Publicbar = () => {
  return (
    <AppBar
      color="inherit"
      elevation={0}
      variant="elevation"
      sx={{ backgroundColor: BACKGROUND }}
    >
      <Container maxWidth="md">
        <Box display="flex" sx={{ px: 2, py: 1 }}>
          <Button href="/login" {...editConnectStyle(COLORS.white)}>
            Login
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <SendActionsDialog />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
