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

import { COLORS } from "~/components/Appbar/common";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from "next-auth/react";
import { api } from "~/utils/api";

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const email = data.get("mail");
    const password = data.get("password");

    const signUp = api.users.signup.useMutation();

    try {
      await signUp.mutateAsync(
        {
          email: email as string,
          password: password as string
        },
        {
          onError: (error) => {
            alert(error.message);
            setLoading(false);
          },
          onSuccess: () => {
            setLoading(false);
          }
        }
      );
      signIn(undefined, { callbackUrl: "/profile" });
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <Container sx={{ margin: "auto" }} maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            minHeight: "max-content",
            border: "2px solid",
            boxShadow: `20px 20px ${COLORS.secondaryPink}, 20px 20px 0px 2px #171d21`
          }}
        >
          <CardContent>
            <Box
              sx={{
                pt: 3,
                pb: 6,
                textAlign: "center"
              }}
            >
              <Typography
                variant="h6"
                component="h1"
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                Welcome to yume 🥳
              </Typography>
              <Typography variant="body1">
                Useful & meaningful gifts without sweat
              </Typography>
            </Box>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                label="Email"
                variant="outlined"
                name="mail"
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
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Typography variant="body1">
                Already a user?{" "}
                <Link
                  href="/login"
                  sx={{ color: COLORS.greenAction, fontWeight: "bold" }}
                >
                  Login here
                </Link>
              </Typography>
            </Stack>
            <Box display="flex" justifyContent="center">
              <Button
                disableElevation
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 4, px: 4 }}
              >
                {loading ? "...loading" : "Create an account"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}

Register.defaultProps = {
  hideBar: true
};
