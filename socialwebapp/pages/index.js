import { getSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { db } from "../firebase";
import { useEffect } from "react";
import firebase from "firebase";

export default function Home({ session, posts }) {
  if (!session) return <Login />;
  useEffect(() => {
    if (session) {
      db.collection("users").doc(session.user.email).set(
        {
          email: session.user.email,
          name: session.user.name,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          userPhoto: session.user.image,
        },
        { merge: true }
      );
    }
  }, [session]);
  return (
    <div className="h-screen bg-gray-100 overflow-scroll">
      <Head>
        <title>Social Media</title>
        <meta name="description" content="Created in Next.JS" />
        <link rel="icon" href="/network.png" />
      </Head>

      <Header currentPage="home" />

      <main className="flex">
        {/* sidebar */}
        <Sidebar currentPage="home" />
        {/* feed */}
        <Feed posts={posts} />
        {/* widgets */}
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

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
