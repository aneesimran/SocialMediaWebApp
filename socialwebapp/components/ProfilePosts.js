import { useSession } from "next-auth/client";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./ProfilePost";
import FlipMove from "react-flip-move";

function ProfilePosts({ posts }) {
  const [session] = useSession();

  var urlSplit = window.location.pathname.split("/");

  const [realtimePosts, loading, error] = useCollection(
    db
      .collection("posts")
      .where("email", "==", urlSplit[2])
      .orderBy("timestamp", "desc")
  );

  return (
    <div>
      <FlipMove enterAnimation="fade" duration="600" delay="300">
        {realtimePosts
          ? realtimePosts?.docs.map((post) => (
              <Post
                key={post.id}
                name={post.data().name}
                message={post.data().message}
                timestamp={post.data().timestamp}
                image={post.data().image}
                postImage={post.data().postImage}
              />
            ))
          : posts.map((post) => {
              <Post
                key={post.id}
                name={post.name}
                message={post.message}
                timestamp={post.timestamp}
                image={post.image}
                postImage={post.postImage}
              />;
            })}
      </FlipMove>
    </div>
  );
}

export default ProfilePosts;
