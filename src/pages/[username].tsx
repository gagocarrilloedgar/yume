import { useRouter } from "next/router";

import { WishList } from "~/components/WitshList";

export default function PublicProfile() {
  const router = useRouter();

  return <WishList isPublic />;
}
