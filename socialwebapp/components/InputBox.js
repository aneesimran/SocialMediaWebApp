import { useSession } from "next-auth/client";
import React from "react";
import Image from "next/image";
import { ThumbUpIcon, CameraIcon } from "@heroicons/react/solid";

function InputBox() {
  const [session, loading] = useSession();
  const sendPost = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-2 ml-2 mr-2 rounded-xl shadow-md font-medium text-sm md:text-base text-gray-500 bg-white md:mt-6 md:ml-2 md:mr-5">
      <div className="flex space-x-4 p-6 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={35}
          height={35}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, soemhiddi csjssodcdedjcjcj?`}
          />
          <button hidden type="submit" onClick={sendPost}></button>
        </form>
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <ThumbUpIcon className="h-7 text-blue-200" />
          <p className="text-xs sm:text-sm xl:text-base">Like</p>
        </div>
        <div className="inputIcon">
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
