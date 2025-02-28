"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUser, FaRegUser } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const { user, loading } = useAuth();
  //   const user = false;
  return (
    <header className="fixed top-0 left-0 w-full divide-y shadow-md bg-white z-10">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <div className="flex items-center space-x-4 md:space-x-10 pt-2">
          <Link href="/">
            <Image
              src="/logo/sagaicle_header_nobg.svg"
              alt="logo"
              width={40}
              height={40}
              className="w-32 m-2 mt-4"
            />
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-4 md:space-x-10 pt-2">
          <Link
            href="/newpost"
            className="flex flex-col items-center mt-4 mb-2"
          >
            <MdPostAdd className="text-2xl text-theme-gray" />
            <span className="text-xs text-theme-gray">Post</span>
          </Link>
          {user ? (
            <Link
              href="/profile"
              className="flex flex-col items-center mt-4 mb-2"
            >
              <FaUser className="text-2xl text-theme-gray" />
              <span className="text-sm text-theme-gray">Profile</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex flex-col items-center mt-4 mb-2"
            >
              <FaRegUser className="text-2xl text-theme-gray" />
              <span className="text-xs text-theme-gray">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
