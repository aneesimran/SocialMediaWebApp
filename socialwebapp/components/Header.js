import React from "react";
import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { FlagIcon, PlayIcon, SearchIcon } from "@heroicons/react/outline";

function Header() {
  return (
    <div>
      {/* Left */}
      <div className="flex items-center">
        <Image src="/connection.png" width={40} height={40} layout="fixed" />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 "
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Center */}

      {/* Right */}
    </div>
  );
}

export default Header;
