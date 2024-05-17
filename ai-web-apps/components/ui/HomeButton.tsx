"use client";

import Link from "next/link";
import React from "react";
import { setActive } from "./bottomNavButtons";

const HomeButton = () => {
  return (
    <Link
      onClick={() => {
        setActive(window.location.origin + "/");
      }}
      className="btn btn-ghost text-xl"
      href="/"
    >
      AI Apps
    </Link>
  );
};

export default HomeButton;
