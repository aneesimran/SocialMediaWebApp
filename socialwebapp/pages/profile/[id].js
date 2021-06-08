import React, { useEffect } from "react";
import styled from "styled-components";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import { db } from "../../firebase";
import Header from "../../components/Header";
import ProfileFeed from "../../components/ProfileFeed";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/LoadingScreen";

function Profile({ session, posts }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <div className="h-screen bg-gray-100 overflow-scroll">
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Created in Next.JS" />
        <link rel="icon" href="/network.png" />
      </Head>
      <Header currentPage="profile" />
      <div className="flex">
        <Sidebar currentPage="profile" />
        <ProfileFeed posts={posts} />
      </div>
    </div>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  const posts = await db
    .collection("posts")
    .where("email", "==", session.user.email)
    .orderBy("timestamp", "desc")
    .get();

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: docs,
    },
  };
}
