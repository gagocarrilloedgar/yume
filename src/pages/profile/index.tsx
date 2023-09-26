import { useSession } from "next-auth/react";
import React from "react";
import { WishList } from "~/components/WitshList";
import { User } from "~/domain/users";
import { Wish, mapWishesToUI } from "~/domain/wishes";
import { api } from "~/utils/api";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { wishes, setState } = useUser();

  const {
    data: user,
    isLoading,
    isError
  } = api.users.findOne.useQuery(
    {
      id: session?.user?.id as string
    },
    { enabled: session?.user !== undefined }
  );

  React.useEffect(() => {
    if (user && !isLoading)
      setState({
        user,
        isLoading,
        isError,
        wishes: mapWishesToUI(user.wishes as Wish[])
      });
  }, [user, isLoading, isError]);

  if ((!isLoading && !user) || (!user && isError))
    return <div>User not found</div>;

  if (!user || isLoading) return <div>Loading...</div>;

  return <WishList user={user} wishes={wishes} />;
}

interface Profile {
  user?: User;
  wishes?: Wish[];
  isLoading: boolean;
  isError: boolean;
}

interface ProfileContextInterface extends Profile {
  handleChange: (update: Partial<Profile>) => void;
  setState: React.Dispatch<React.SetStateAction<Profile>>;
}

const UserContext = React.createContext<ProfileContextInterface | undefined>(
  undefined
);

const defaultState = {
  user: undefined,
  wishes: undefined,
  isLoading: true,
  isError: true
};

export const UserProvider = ({
  initialState = defaultState,
  children
}: React.PropsWithChildren<{ initialState?: Profile }>) => {
  const [state, setState] = React.useState<Profile>(initialState);

  const handleChange: ProfileContextInterface["handleChange"] = (update) =>
    setState({ ...state, ...update });

  const contextValue = React.useMemo(
    () => ({ ...state, handleChange, setState }),
    [state, handleChange]
  );

  React.useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
};
