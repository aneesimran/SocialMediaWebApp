import React from "react";
import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex-1">
      <InputBox />
      <Posts />
    </div>
  );
}

export default Feed;
