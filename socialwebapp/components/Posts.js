import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";
import { motion } from "framer-motion";
import FlipMove from "react-flip-move";

function Posts({ posts }) {
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
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
                email={post.data().email}
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
                email={post.email}
                image={post.image}
                postImage={post.postImage}
              />;
            })}
      </FlipMove>
    </div>
  );
}

export default Posts;
