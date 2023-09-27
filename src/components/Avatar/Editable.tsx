import LoadingButton from "@mui/lab/LoadingButton";
import { Card, CardContent, Stack, TextField } from "@mui/material";
import React from "react";
import { User } from "~/domain/users";
import { useUser } from "~/pages/profile";
import { COLORS } from "~/theme";
import { api } from "~/utils/api";
import { compact } from "~/utils/compact";

export const EditableAvatar = ({ user }: { user: User }) => {
  const [state, setState] = React.useState<{
    user: User;
    changes: boolean;
    loading: boolean;
  }>({
    user,
    changes: false,
    loading: false
  });

  const updateUser = api.users.update.useMutation();

  const { handleChange: updateLoggedUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      changes: true,
      user: { ...prev.user, [name]: value }
    }));
  };

  const setLoading = (loading: boolean) => {
    setState((prev) => ({
      ...prev,
      loading
    }));
  };

  const saveChanges = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!state.changes) return;

    setLoading(true);

    const updates = compact(state.user);

    try {
      await updateUser.mutateAsync(
        {
          ...updates
        },
        {
          onError: (error) => {
            alert(error.message);
          },
          onSuccess: (data) => {
            setState((prev) => ({
              ...prev,
              changes: false
            }));

            if (!data) return;
            const newUser = data;
            updateLoggedUser({ user: newUser });
          }
        }
      );

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        my: 2,
        border: "2px solid"
      }}
    >
      <CardContent>
        {/*Next version*/}
        {/*<Box
          display="flex"
          sx={{ my: 2 }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Avatar sx={{ width: 100, height: 100, border: "2px solid #000" }}>
            {state.user.name}
          </Avatar>
          <Button
            color="inherit"
            sx={{ backgroundColor: COLORS.primaryGreen, px: 4 }}
          >
            Pick new image
          </Button>
    </Box>*/}
        <Stack spacing={2} direction="column">
          <TextField
            fullWidth
            color="info"
            variant="outlined"
            value={state.user.name}
            onChange={handleChange}
            label="Name"
            name="name"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            rows={3}
            value={state.user.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            name="bio"
            rows={3}
            value={state.user.bio ?? ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Username (handler)"
            variant="outlined"
            name="username"
            rows={3}
            value={state.user.username}
            onChange={handleChange}
          />
        </Stack>
        <LoadingButton
          color="inherit"
          onClick={saveChanges}
          disabled={!state.changes}
          loading={state.loading}
          sx={{
            backgroundColor: COLORS.primaryGreen,
            mt: 4
          }}
        >
          {"Save changes"}
        </LoadingButton>
      </CardContent>
    </Card>
  );
};
