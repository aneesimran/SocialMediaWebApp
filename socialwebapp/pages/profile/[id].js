import React from "react";
import styled from "styled-components";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { db } from "../../firebase";
import Header from "../../components/Header";

function Profile({ session, posts }) {
  return (
    <div>
      <Header currentPage="profile" />
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
