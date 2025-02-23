"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUser, FaRegUser } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";

function Header() {
  const { user, loading } = useAuth();
  //   const user = false;
  return (
    <header className="fixed top-0 left-0 w-full bg-theme-yellow divide-y border-b-2 border-gray-300">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <div className="flex items-center space-x-4 md:space-x-10 pt-2">
          <Link href="/">
            <Image
              src="/logo/R-SNS.svg"
              alt="logo"
              width={40}
              height={40}
              className="w-32 m-2 mt-4"
            />
          </Link>
          <nav className="flex items-center gap-4 text-sm pt-2">
            <Link href="/about" className="font-medium text-theme-gray">
              About
            </Link>
            <Link href="/about" className="font-medium text-theme-gray">
              Help
            </Link>
          </nav>
        </div>
        <Link
          href="/auth/login"
          className="flex flex-col items-center px-3 mt-4 mb-2"
        >
          {user ? (
            <>
              <FaUser className="text-2xl text-theme-gray" />
              <span className="text-sm text-theme-gray">Profile</span>
            </>
          ) : (
            <>
              <FaRegUser className="text-2xl text-theme-gray" />
              <span className="text-xs text-theme-gray">Login</span>
            </>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
