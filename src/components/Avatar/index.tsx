import {
  Box,
  Avatar as MuiAvatar,
  Typography,
  useMediaQuery
} from "@mui/material";

import { User } from "~/domain/users";
import { EditableAvatar } from "./Editable";

export const Avatar = ({
  isPrivate,
  user
}: {
  isPrivate: boolean;
  user: User;
}) => {
  // Define responsive styles
  const avatarStylesSmall = {
    border: "2px solid #000",
    width: "6rem",
    height: "6rem",
    marginBottom: "1rem"
  };

  // Use MUI's useMediaQuery to get the screen width
  const isMediumScreen = useMediaQuery("(min-width: 481px)");
  const isLargeScreen = useMediaQuery("(min-width: 769px)");

  // Adjust styles for larger screens using media queries
  if (isMediumScreen) {
    avatarStylesSmall.width = "8rem";
    avatarStylesSmall.height = "8rem";
  }

  if (isLargeScreen) {
    avatarStylesSmall.width = "10rem";
    avatarStylesSmall.height = "10rem";
    avatarStylesSmall.marginBottom = "2rem";
  }

  if (isPrivate && user) return <EditableAvatar user={user} />;

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      sx={{ pb: 4 }}
    >
      <MuiAvatar alt="Remy Sharp" sx={avatarStylesSmall}>
        {user?.name}
      </MuiAvatar>
      <Typography variant="h5" fontWeight="bold">
        {user?.name}
      </Typography>
      <Typography variant="body1">{user?.bio ?? ""}</Typography>
    </Box>
  );
};
