import { signIn } from "next-auth/react";
import React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { useRouter } from "next/navigation";
import { COLORS } from "~/theme";

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    if (!email) return;

    const res = await signIn("credentials", {
      email,
      redirect: false
    });

    if (!res?.error) return router.push("/reset-password");
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
            boxShadow: `20px 20px ${COLORS.secondaryViolet}, 20px 20px 0px 2px #171d21`
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
                FORGOT my password 🤔🤔
              </Typography>
              <Typography variant="body1">
                We will send you a code to reset your password
              </Typography>
            </Box>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                variant="outlined"
                label="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
              />
              <Stack spacing={1}>
                <Typography variant="body1">
                  <Link
                    href="/login"
                    sx={{ color: COLORS.greenAction, fontWeight: "bold" }}
                  >
                    Go back to login
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Box display="flex" justifyContent="center">
              <Button
                disableElevation
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 4, px: 4 }}
              >
                Send me the code
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
