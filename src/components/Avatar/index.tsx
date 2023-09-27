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
    width: "5.5rem",
    height: "5.5rem",
    marginBottom: "1rem"
  };

  // Use MUI's useMediaQuery to get the screen width
  const isMediumScreen = useMediaQuery("(min-width: 481px)");
  const isLargeScreen = useMediaQuery("(min-width: 769px)");

  // Adjust styles for larger screens using media queries
  if (isMediumScreen) {
    avatarStylesSmall.width = "6rem";
    avatarStylesSmall.height = "6rem";
  }

  if (isLargeScreen) {
    avatarStylesSmall.width = "7rem";
    avatarStylesSmall.height = "7rem";
  }

  if (isPrivate && user) return <EditableAvatar user={user} />;

  const userImage = user?.image ?? "";

  const hasUrlImageFormat = userImage.startsWith("http");
  const roboHashCatGenerator = `https://robohash.org/${user?.username}?set=set4`;
  const imageSRC = hasUrlImageFormat ? userImage : roboHashCatGenerator;

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      sx={{ pb: 2 }}
    >
      <MuiAvatar src={imageSRC} alt="Remy Sharp" sx={avatarStylesSmall}>
        {user?.username}
      </MuiAvatar>
      <Typography variant="h5" fontWeight="bold">
        @{user?.username}
      </Typography>
      <Typography variant="body1">{user?.bio ?? ""}</Typography>
    </Box>
  );
};
