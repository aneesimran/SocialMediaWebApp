import React, { forwardRef } from "react";
import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";
import styled from "styled-components";

const ProfilePost = forwardRef(
  ({ name, message, email, postImage, image, timestamp }, ref) => {
    return (
      <Container ref={ref}>
        <PostInfo>
          <img
            className="rounded-full"
            src={image}
            width={35}
            height={35}
            alt=""
          />
          <PostHText>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </PostHText>
        </PostInfo>
        <p className="pt-4">{message}</p>
        {postImage && (
          <div className="relative mt-5 -ml-5 -mr-5  h-56 md:h-96  bg-gray-200">
            <Image src={postImage} objectFit="contain" layout="fill" />
          </div>
        )}
      </Container>
    );
  }
);

export default ProfilePost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1px;
  justify-content: center;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 0.75rem;
  box-shadow: 4px 4px 4px lightgray;
  background-color: white;
  padding: 20px;

  @media (min-width: 768px) {
    margin-top: 20px;
    margin-left: 70px;
    margin-right: 70px;
  }

  @media (min-width: 1024px) {
    margin-top: 20px;
    margin-left: 130px;
    margin-right: 130px;
  }
  @media (min-width: 1280px) {
    margin-top: 20px;
    margin-left: 240px;
    margin-right: 240px;
  }
  @media (min-width: 1536px) {
    margin-top: 20px;
    margin-left: 400px;
    margin-right: 400px;
  }
  @media (min-width: 2160px) {
    margin-top: 20px;
    margin-left: 600px;
    margin-right: 600px;
  }
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
`;

const PostHText = styled.div`
  > p {
    padding-left: 10px;
  }
`;
