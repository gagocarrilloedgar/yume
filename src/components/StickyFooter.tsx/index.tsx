
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const StickyFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: "auto",
        textAlign: "center"
      }}
    >
      <Typography variant="body2">
        Created with 👨‍💻 by @gagocarrilloedgar
      </Typography>
      <Copyright />
    </Box>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://yume.so/">
        yumedotso
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
