import React from "react";
import { getSession, useSession } from "next-auth/client";
import router from "next/router";

export default function profile() {
  const [session] = useSession();

  router.push(`/profile/${session.user.email}`);
  return <div></div>;
}

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
