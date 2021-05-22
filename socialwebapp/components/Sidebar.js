import { useSession } from "next-auth/client";
import React from "react";
import Image from "next/image";
import SidebarIcon from "./SidebarIcons";
import { HomeIcon } from "@heroicons/react/solid";
import { ChatAlt2Icon } from "@heroicons/react/solid";

function Sidebar() {
  const [session, loading] = useSession();
  return (
    <div>
      <div className="border flex-col bg-white w-12 pt-2 shadow-md h-screen md:hidden">
        <SidebarIcon active Icon={HomeIcon} />
        <SidebarIcon Icon={ChatAlt2Icon} />
      </div>
      <div
        className=" hidden lg:flex flex-col items-center w-1/5 ml-3 mt-5 top-80 sticky 
     text-center xl:w-1/6 "
      >
        <div className="border rounded-xl pb-4 rounded-b-none shadow-md">
          <div className="-mb-11">
            <Image
              className="object-cover w-full rounded-xl rounded-b-none"
              src="/background.png"
              width={560}
              height={200}
            />
          </div>

          <Image
            className="rounded-full"
            src={session.user.image}
            width="70"
            height="70"
            layout="fixed"
          />
          <h2 className="text-xl p-2">{session.user.name}</h2>
        </div>
        <h4
          className="pb-4 mt-3 pt-4 border w-full rounded-t-none hover:bg-gray-100
       hover:text-purple-500 rounded-xl cursor-pointer shadow-md"
        >
          My Profile
        </h4>
      </div>
    </div>
  );
}

export default Sidebar;
