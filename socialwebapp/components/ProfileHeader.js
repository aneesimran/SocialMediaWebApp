import { useSession } from "next-auth/client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { Avatar } from "@material-ui/core";

function ProfileHeader() {
  const [session] = useSession();

  var urlSplit = window.location.pathname.split("/");

  const [userProfileData, loading, error] = useCollection(
    db.collection("users").where("email", "==", urlSplit[2])
  );

  const userProfile = userProfileData?.docs?.[0]?.data();

  return (
    <Container>
      <img src="/background.png" />
      <UserImage>
        <UserAvatar>
          <img src={userProfile?.userPhoto} />
        </UserAvatar>
      </UserImage>
      <UserDetails>
        <p>{userProfile?.name}</p>
        <span>
          <p>{userProfile?.email}</p>
        </span>
      </UserDetails>
    </Container>
  );
}

export default ProfileHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1px;
  justify-content: center;
  margin: 20px;
  border-top-right-radius: 20px;
  box-shadow: 4px 4px 4px lightgray;

  @media (min-width: 768px) {
    margin-top: 40px;
    margin-left: 70px;
    margin-right: 70px;
  }

  @media (min-width: 1024px) {
    margin-top: 40px;
    margin-left: 130px;
    margin-right: 130px;
  }
  @media (min-width: 1280px) {
    margin-top: 40px;
    margin-left: 240px;
    margin-right: 240px;
  }
  @media (min-width: 1536px) {
    margin-top: 40px;
    margin-left: 400px;
    margin-right: 400px;
  }
  @media (min-width: 2160px) {
    margin-top: 40px;
    margin-left: 600px;
    margin-right: 600px;
  }

  > img {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    width: 100%;
    height: 120px;
    object-fit: cover;
    @media (min-width: 768px) {
      height: 140px;
    }
  }
`;

const UserDetails = styled.div`
  margin-top: -36px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: right;
  padding-right: 30px;
  background-color: white;
  font-size: 18px;
  font-weight: 500;
  > span {
    font-size: 12px;
    font-weight: 200;
  }
`;

const UserImage = styled.div`
  margin-top: -90px;
  margin-left: 10px;
  @media (min-width: 768px) {
    margin-left: 30px;
  }
`;

const UserAvatar = styled.div`
  height: 90px;
  position: relative;
  z-index: 100;
  width: 90px;
  border: whitesmoke solid 5px;
  box-shadow: 2px 2px 4px gray;
  border-radius: 999px;
  @media (min-width: 768px) {
    height: 110px;
    width: 110px;
  }
  > img {
    height: 80px;
    width: 80px;
    border-radius: 999px;
    @media (min-width: 768px) {
      height: 100px;
      width: 100px;
    }
  }
`;
