import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  const isSignedIn = useSession()?.status === "authenticated";
  const isProfilePage = usePathname()?.includes("profile");

  return (
    isSignedIn &&
    isProfilePage && (
      <Button
        disableElevation
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    )
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
