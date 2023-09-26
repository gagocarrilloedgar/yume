import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { AppBar, Box, Button, Container, IconButton } from "@mui/material";
import {
  BACKGROUND,
  COLORS,
  editConnectStyle,
  iconButtonStyle
} from "./common";

export const Publicbar = () => {
  return (
    <AppBar
      color="inherit"
      elevation={0}
      variant="elevation"
      sx={{ backgroundColor: BACKGROUND }}
    >
      <Container maxWidth="md">
        <Box display="flex" sx={{ pt: 2 }}>
          <Button {...editConnectStyle(COLORS.white)}>Conectar</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="small"
              aria-label="Share"
              type="button"
              {...iconButtonStyle}
            >
              <SendOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
