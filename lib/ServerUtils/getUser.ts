import { getSession } from "@/lib/session";
import { headers } from "next/headers";

export const getUser = async () => {
  const session = await getSession(headers().get("cookie"));

  if (!session?.user) {
    return null;
  }

  return session.user;
};
