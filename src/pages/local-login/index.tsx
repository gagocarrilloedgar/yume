import { signIn } from "next-auth/react";
import React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useRouter } from "next/router";
import { COLORS } from "~/theme";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const router = useRouter();

  const isLocal = process.env.NODE_ENV === "development";

  if (!isLocal) router.push("/login");

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) return;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (!res?.error) return router.push("/profile");
  };

  return (
    <Container sx={{ margin: "auto" }} maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            minHeight: "max-content",
            border: "2px solid",
            boxShadow: `20px 20px ${COLORS.secondaryOrange}, 20px 20px 0px 2px #171d21`
          }}
        >
          <CardContent>
            <Box
              sx={{
                pt: 3,
                pb: 2,
                textAlign: "center"
              }}
            >
              <Typography
                variant="h6"
                component="h1"
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                Nice to see you😎
              </Typography>
              <Typography variant="body1">
                Useful & meaninfull gifts without sweat
              </Typography>
            </Box>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                variant="outlined"
                label="Email"
                type="email"
                name="email"
              />
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Stack spacing={1}>
                <Typography variant="body1">
                  Already a user?{" "}
                  <Link
                    href="/register"
                    sx={{ color: COLORS.greenAction, fontWeight: "bold" }}
                  >
                    Signup here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  Forgot password?{" "}
                  <Link
                    href="/forgot"
                    sx={{ color: COLORS.greenAction, fontWeight: "bold" }}
                  >
                    Reset it here
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Box display="flex" pb={4} justifyContent="center">
              <Button
                disableElevation
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 4, px: 4 }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}

Login.defaultProps = {
  hideBar: true
};
