import { CircularProgress } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { WishList } from "~/components/WitshList";
import { Wish, mapWishesToUI } from "~/domain/wishes";
import { api } from "~/utils/api";
import { useUser } from "./profile";

interface PublicProfileProps {
  username: string;
}

// Use the correct prop interface when defining the component
const PublicProfile: NextPage<PublicProfileProps> = ({ username }) => {
  const { data, isLoading, isError } = api.users.findOnePublic.useQuery(
    { username },
    { enabled: !!username }
  );

  const { setState } = useUser();

  React.useEffect(() => {
    if (data && !isLoading) {
      const { wishes, ...user } = data;
      setState({
        user,
        isLoading,
        isError,
        wishes: mapWishesToUI(wishes as Wish[])
      });
    }
  }, [data, isLoading, isError]);

  if ((!isLoading && !data) || (!data && isError))
    return <div>User not found</div>;

  if (!data || isLoading) return <CircularProgress />;

  return <WishList isPublic />;
};

export default PublicProfile;
interface PageParams extends ParsedUrlQuery {
  userame: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as PageParams;

  return { props: { username } };
};
