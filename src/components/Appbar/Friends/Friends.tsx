import { useState } from "react";

import {
  Button,
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
  ListSubheader,
  IconButton,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@mui/material";

import { COLORS } from "~/theme";

import { editConnectStyle } from "../common";
import { CloseOutlined } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useUser } from "~/pages/profile";
import { useUserFavorites } from "../FollowButton";

export const Friends = () => {
  const [open, setOpen] = useState(false);

  const notWideScreen = useMediaQuery("(max-width:1300px)");
  const anchor = notWideScreen ? "bottom" : "left";

  const { data: session } = useSession();
  const { user } = useUser();
  const { favorites } = useUserFavorites({ session });

  const handleClick = () => setOpen((prev) => !prev);

  console.log({ favorites });
  return (
    <>
      <Button onClick={handleClick} {...editConnectStyle(COLORS.white)}>
        Friends
      </Button>
      <Drawer anchor={anchor} open={open} onClose={handleClick}>
        {/**Drawer header */}
        <List
          component="nav"
          sx={{
            minWidth: 250,
            height: notWideScreen ? "50vh" : "auto",
            p: 2,
            gap: 2,
            overflow: "auto"
          }}
          subheader={
            <ListSubheader
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 2
              }}
            >
              <Typography variant="body1">My connections</Typography>
              <IconButton size="small" onClick={handleClick}>
                <CloseOutlined />
              </IconButton>
            </ListSubheader>
          }
        >
          {favorites?.map(({ id, favoriteUser }) => (
            <ListItemButton key={id}>
              <ListItemAvatar>
                <Avatar
                  sx={{ width: 36, height: 36 }}
                  alt="Remy Sharp"
                  src={favoriteUser.image ?? favoriteUser.username}
                />
              </ListItemAvatar>
              <ListItemText primary={favoriteUser.username} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
