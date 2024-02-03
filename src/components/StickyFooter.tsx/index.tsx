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
        Created with 👨‍💻 by{" "}
        <Link
          color="inherit"
          target="_blank"
          href="https://github.com/gagocarrilloedgar"
        >
          @gagocarrilloedgar
        </Link>{" "}
      </Typography>
      {/*<Copyright />*/}
    </Box>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://yume.so/">
        milista
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
