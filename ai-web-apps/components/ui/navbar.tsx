import React from "react";
import AuthButton from "../auth/AuthButton";
import Avatar from "./Avatar";
import BottomNavButtons from "./bottomNavButtons";

const Navbar = async () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">AI Apps</a>
        </div>
        <div className="flex-none">
          <details className="dropdown dropdown-end">
            <summary className="m-1 btn btn-squar btn-ghost">
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
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </details>
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
