import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { session, useSession, signOut } from "next-auth/client";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function Header({ currentPage }) {
  const [session] = useSession();

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image src="/network.png" width={40} height={40} layout="fixed" />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden sm:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink "
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Center */}

      <div className=" hidden md:flex justify-center flex-grow xl:pl-16 2xl:pl-60">
        {(() => {
          if (currentPage == "home") {
            return (
              <div className="flex space-x-10 lg:space-x-20 -mr-40">
                <Link href="/">
                  <a>
                    <HeaderIcon active Icon={HomeIcon} />
                  </a>
                </Link>
                <Link href="/chat">
                  <a>
                    <HeaderIcon Icon={ChatAlt2Icon} />
                  </a>
                </Link>
                <Link href="/profile">
                  <a>
                    <HeaderIcon Icon={UserCircleIcon} />
                  </a>
                </Link>
              </div>
            );
          } else if (currentPage == "chat") {
            return (
              <div className="flex space-x-10 lg:space-x-20 -mr-40">
                <Link href="/">
                  <a>
                    <HeaderIcon Icon={HomeIcon} />
                  </a>
                </Link>
                <Link href="/chat">
                  <a>
                    <HeaderIcon active Icon={ChatAlt2Icon} />
                  </a>
                </Link>
                <Link href="/profile">
                  <a>
                    <HeaderIcon Icon={UserCircleIcon} />
                  </a>
                </Link>
              </div>
            );
          } else {
            return (
              <div className="flex space-x-10 lg:space-x-20 -mr-40">
                <Link href="/">
                  <a>
                    <HeaderIcon Icon={HomeIcon} />
                  </a>
                </Link>
                <Link href="/chat">
                  <a>
                    <HeaderIcon Icon={ChatAlt2Icon} />
                  </a>
                </Link>
                <Link href="/profile">
                  <a>
                    <HeaderIcon active Icon={UserCircleIcon} />
                  </a>
                </Link>
              </div>
            );
          }
        })()}

        {/*<HeaderIcon Icon={UserGroupIcon} />*/}
      </div>

      {/* Right */}
      <div className="flex items-center flex-grow sm:space-x-2 justify-end">
        <p className="font-semibold pr-3 md:hidden">{session.user.name}</p>
        <div className="pr-2 pt-1.5">
          <Image
            className="rounded-full"
            src={session.user.image}
            width="35"
            height="35"
            layout="fixed"
          />
        </div>
        <ExitToAppRoundedIcon
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          fontSize="large"
          className="icon"
        />
      </div>
    </div>
  );
}

export default Header;
