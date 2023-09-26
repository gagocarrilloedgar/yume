import { CircularProgress } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { WishList } from "~/components/WitshList";
import { User } from "~/domain/users";
import { Wish, mapWishesToUI } from "~/domain/wishes";
import { api } from "~/utils/api";

interface PublicProfileProps {
  username: string;
}

// Use the correct prop interface when defining the component
const PublicProfile: NextPage<PublicProfileProps> = ({ username }) => {
  const { data, isLoading, isError } = api.users.findOnePublic.useQuery(
    { username },
    { enabled: !!username }
  );

  if ((!isLoading && !data) || (!data && isError))
    return <div>User not found</div>;

  if (!data || isLoading) return <CircularProgress />;

  const userData = {
    bio: data.bio,
    name: data.name,
    image: data.image,
    username
  } as User;

  const wishses = mapWishesToUI(data.wishes as Wish[]);

  return <WishList user={userData} isPublic wishes={wishses} />;
};

export default PublicProfile;
interface PageParams extends ParsedUrlQuery {
  userame: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as PageParams;

  return { props: { username } };
};
