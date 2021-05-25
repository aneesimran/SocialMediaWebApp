import React from "react";
import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";

function Post({ name, message, email, postImage, image, timestamp }) {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white shadow-md mt-2 ml-2 mr-2 rounded-t-xl md:mt-2 md:ml-2 md:mr-5 ">
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
        <div className=" mr-2 ml-2 md:pl-24 md:pr-20 md:mr-5 md:ml-2 bg-black">
          <div className="relative ml-2 mr-2 md:ml-2 md:mr-5 h-56 md:h-96 bg-white">
            <Image src={postImage} objectFit="cover" layout="fill" />
          </div>
        </div>
      )}
      {/*Footer of post*/}
      <div className="flex ml-2 mr-2 md:ml-2 md:mr-5 justify-between items-center rounded-b-xl bg-white shadow-md text-gray-400 border-t">
        <div className="inputIcon rounded-none rounded-b-xl">
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
      </div>
    </div>
  );
}

export default Post;