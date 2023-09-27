import { AppBar, Box, Container } from "@mui/material";
import SendActionsDialog from "./SendActionsDialog";
import { BACKGROUND } from "./common";

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
          {/*<Button {...editConnectStyle(COLORS.white)}>Conectar</Button>*/}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <SendActionsDialog />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
