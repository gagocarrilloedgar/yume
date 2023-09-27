import { AppBar, Box, Button, Container } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useUser } from "~/pages/profile";
import { AddNewWish } from "../AddNewWish";
import SendActionsDialog from "./SendActionsDialog";
import { BACKGROUND, COLORS, editConnectStyle } from "./common";

export const Privatebar = () => {
  const router = useRouter();
  const { username } = router.query;

  const isProfilePage = usePathname()?.includes("/profile");

  const { user, wishes } = useUser();

  const isSameUser = user?.username === username;

  const showEdit = !isProfilePage && isSameUser;

  const nextPosition = (wishes?.length ?? 0) + 1;

  return (
    <AppBar
      color="inherit"
      elevation={0}
      variant="elevation"
      sx={{ backgroundColor: BACKGROUND }}
    >
      <Container maxWidth="md">
        <Box display="flex" sx={{ px: 2, py: 1 }}>
          {showEdit ? (
            <Button href="/profile" {...editConnectStyle(COLORS.white)}>
              Edit
            </Button>
          ) : (
            <Button
              href={`/${user?.username}`}
              {...editConnectStyle(COLORS.secondaryViolet)}
            >
              Preview
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            {showEdit ? (
              <SendActionsDialog />
            ) : (
              <AddNewWish position={nextPosition} />
            )}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
