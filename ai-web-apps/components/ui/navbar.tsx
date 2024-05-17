import React from "react";
import AuthButton from "../auth/AuthButton";
import Avatar from "./Avatar";
import BottomNavButtons, { setActive } from "./bottomNavButtons";
import Link from "next/link";
import HomeButton from "./HomeButton";

const Navbar = async () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <HomeButton />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-square btn-ghost m-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </div>
          <ul
            id=""
            className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link href="/" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link href="/chatbot">Chatbot</Link>
            </li>
            <li>
              <Link href={"/notes"}>Notes</Link>
            </li>
          </ul>
        </div>

        <AuthButton />
        <Avatar />
      </div>
      <div className="btm-nav lg:hidden">
        <BottomNavButtons />
      </div>
    </>
  );
};

export default Navbar;
