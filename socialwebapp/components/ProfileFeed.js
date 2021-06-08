import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

function ProfileFeed({ posts }) {
  return (
    <div>
      <ProfileHeader />
      <ProfilePosts posts={posts} />
    </div>
  );
}

export default ProfileFeed;
