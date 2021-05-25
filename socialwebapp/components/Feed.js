import React from "react";
import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed({ posts }) {
  return (
    <div className="flex-1">
      <InputBox />
      <Posts posts={posts} />
    </div>
  );
}

export default Feed;
