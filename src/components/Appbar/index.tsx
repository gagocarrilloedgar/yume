import { useSession } from "next-auth/react";
import { Privatebar } from "./Privatebar";
import { Publicbar } from "./Publicbar";

export const Appbar = () => {
  const isPublic = useSession().status === "unauthenticated";

  if (isPublic) return <Publicbar />;

  return <Privatebar />;
};
