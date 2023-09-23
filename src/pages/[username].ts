import { useRouter } from "next/router";

export default function PublicProfile() {
  const router = useRouter();

  const { username } = router.query;

  return username;
}
