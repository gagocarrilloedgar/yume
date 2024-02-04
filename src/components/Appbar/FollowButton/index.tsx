import { Button } from "@mui/material";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { COLORS } from "~/theme";

import { api } from "~/utils/api";
import { Favorite } from "~/domain/favorites";
import { useUser } from "~/pages/profile";

import { editConnectStyle } from "../common";

export const FollowButton = () => {
  const { data: session } = useSession();
  const { user } = useUser();
  const { favorites } = useUserFavorites({ session });
  const toggleFavorite = useToggleFavorite({
    userId: session?.user.id,
    friendId: user?.id,
    favorites
  });

  const isFollowing =
    user?.id && favorites.map((f) => f.favoriteUserId).includes(user?.id);

  const handleClick = async () => {
    await toggleFavorite();
  };

  return (
    <Button onClick={handleClick} {...editConnectStyle(COLORS.white)}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const useUserFavorites = ({ session }: { session: Session | null }) => {
  const { data, status } = api.favorites.findUserFavorites.useQuery(
    {
      userId: session?.user.id!
    },
    { enabled: !!session?.user.id }
  );

  const favorites = data ?? [];

  return { favorites, isLoading: status === "loading" };
};

export const useToggleFavorite = ({
  userId,
  friendId,
  favorites
}: {
  userId?: string;
  friendId?: string;
  favorites: Favorite[];
}) => {
  const { mutateAsync: createFavorite } =
    api.favorites.createFavorite.useMutation();

  const { mutateAsync: deleteFavorite } =
    api.favorites.deleteFavorite.useMutation();

  const toggle = async () => {
    const isFollowing =
      friendId && favorites.map((f) => f.favoriteUserId).includes(friendId);

    if (isFollowing && friendId) {
      const favorite = favorites.find((f) => f.favoriteUserId === friendId);

      if (!favorite) return;

      await deleteFavorite({ id: favorite?.id });
      return;
    }

    if (friendId && userId)
      await createFavorite({ userId, favoriteUserId: friendId });
  };

  return toggle;
};
