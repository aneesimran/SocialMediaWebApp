import React, { forwardRef } from "react";
import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";

const Post = forwardRef(
  ({ name, message, email, postImage, image, timestamp }, ref) => {
    return (
      <div ref={ref} className="flex flex-col">
        <div className="p-5 bg-white shadow-md mt-2 ml-2 mr-2 rounded-t-xl md:mt-2 md:ml-2 md:mr-5 2xl:ml-60 2xl:mr-64">
          <div className="flex items-center space-x-2">
            <img
              className="rounded-full"
              src={image}
              width={35}
              height={35}
              alt=""
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-gray-400">
                {new Date(timestamp?.toDate()).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="pt-4">{message}</p>
        </div>
        {postImage && (
          <div className="relative ml-2 mr-2 md:ml-2 md:mr-5 h-56 md:h-96 2xl:ml-60 2xl:mr-64 bg-gray-200">
            <Image src={postImage} objectFit="contain" layout="fill" />
          </div>
        )}
        {/*Footer of post*/}
        <div className="flex ml-2 mr-2 md:ml-2 md:mr-5 2xl:ml-60 2xl:mr-64 justify-between items-center rounded-b-xl bg-white shadow-md text-gray-400 border-t">
          <div className="inputIcon rounded-none rounded-b-xl">
            <ThumbUpIcon className="h-4" />
            <p className="text-xs sm:text-base">Like</p>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
