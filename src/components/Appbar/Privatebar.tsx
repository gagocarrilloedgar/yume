import { AppBar, Box, Button, Container } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useUser } from "~/pages/profile";
import { AddNewWish } from "../AddNewWish";
import SendActionsDialog from "./SendActionsDialog";
import { BACKGROUND, editConnectStyle } from "./common";
import { COLORS } from "~/theme";
import { useSession } from "next-auth/react";
import { Friends } from "./Friends/Friends";

export const Privatebar = () => {
  const router = useRouter();

  const { status, data } = useSession();
  const isProfilePage = usePathname()?.includes("/profile");
  const { wishes, isLoading } = useUser();

  const { username } = router.query;
  const isSameUser = data?.user?.username === username;
  const showNewWish = isProfilePage && isSameUser;
  const nextPosition = (wishes?.length ?? 0) + 1;

  if (isLoading || status === "loading") return null;

  return (
    <AppBar
      color="inherit"
      elevation={0}
      variant="elevation"
      sx={{ backgroundColor: BACKGROUND }}
    >
      <Container maxWidth="md">
        <Box display="flex" sx={{ px: 2, py: 1 }}>
          <Box display="flex" sx={{ px: 0, py: 1, gap: 2 }}>
            <LeftActionButton
              isProfilePage={isProfilePage}
              isSameUser={isSameUser}
              isAuth={status === "authenticated"}
              username={(username as string) ?? data?.user.username}
            />
            <Friends />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            {showNewWish ? (
              <AddNewWish position={nextPosition} />
            ) : (
              <SendActionsDialog />
            )}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

const LeftActionButton = ({
  isProfilePage,
  isSameUser,
  isAuth,
  username
}: {
  isProfilePage: boolean;
  isSameUser: boolean;
  isAuth: boolean;
  username: string;
}) => {
  if (!isProfilePage && isSameUser)
    return (
      <Button href="/profile" {...editConnectStyle(COLORS.white)}>
        Edit
      </Button>
    );

  if (isProfilePage && isAuth)
    return (
      <Button
        href={`/${username}`}
        {...editConnectStyle(COLORS.secondaryViolet)}
      >
        Preview
      </Button>
    );

  return (
    <Button href={`/${username}`} {...editConnectStyle(COLORS.white)}>
      Connect
    </Button>
  );
};
