import React from "react";
import Image from "next/image";
import {
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ChatAlt2Icon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";

function Header() {
  return (
    <div className="sticky top- z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image src="/network.png" width={40} height={40} layout="fixed" />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink "
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Center */}

      <div className="flex justify-center flex-grow ">
        <div className="flex space-x-6 md:space-x-10">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={ChatAlt2Icon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
    </div>
  );
}

export default Header;