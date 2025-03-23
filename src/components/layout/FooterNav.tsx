"use client";

import { useContext } from "react";
import { Context } from "../context/context";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FooterNav() {
  const ctx = useContext(Context);
  if (!ctx) return null;
  const { user } = ctx;
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;

  return (
    <div className="flex items-center fixed bottom-0 left-0 right-0 w-full bg-[#0a0a0a] border-t-[1px] border-t-gray-500/20">
      <div className="max-w-[1280px] gap-6 flex pb-[15px] pt-3 items-center justify-between mx-auto">
        <Link href="/" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isActive("/") ? "white" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-[35px] h-[35px] ${isActive("/") ? "fill-white" : "fill-none"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        <Link href="/search" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isActive("/search") ? "white" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-[35px] fill-none h-[35px] ${
              isActive("/search") ? "stroke-3" : "stroke-1"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Link>

        <Link
          href="/create"
          className={`border-white border-[1px] rounded-md  ${
            isActive("/create") ? "bg-white text-black" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isActive("/create") ? "white" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>

        <Link href="/inbox" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isActive("/inbox") ? "white" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-[35px] h-[35px] ${
              isActive("/inbox") ? "fill-white" : "fill-none"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </Link>

        <Link
          href="/profile"
          className={` rounded-full hover:border-gray-300 hover:border-1 p-[1px] h-[32px] w-[32px] transition  ${
            isActive("/profile") ? " border-gray-300 border-1" : ""
          }`}
        >
          <img
            src={user?.data?.avatar || "/user.jpg"}
            alt="User avatar"
            className="w-full h-full rounded-full object-cover border-2 border-transparent "
          />
        </Link>
      </div>
    </div>
  );
}
