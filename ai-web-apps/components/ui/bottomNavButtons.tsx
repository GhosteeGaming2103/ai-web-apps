"use client";

import { Home, Bot, NotebookPen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";

export const setActive = (val: string) => {
  const links = document.querySelectorAll("a");
  console.log(val);
  links.forEach((link) => {
    if (link.href == val) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const BottomNavButtons = () => {
  // const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   const parent = event.currentTarget.parentElement;
  //   const element = event.currentTarget;
  //   if (parent) {
  //     const links = parent.querySelectorAll("a");
  //     if (links) {
  //       links.forEach((link) => {
  //         link.classList.remove("active");
  //       });
  //     }
  //     element.classList.toggle("active");
  //   }
  // };
  useEffect(() => {
    setActive(window.location.href);
    // When new page load set active class
  }, []);
  return (
    <>
      <Link
        href={"/"}
        onClick={() => {
          setActive(window.location.origin + "/");
        }}
        className="hover:bg-base-200"
      >
        <Home />
      </Link>
      <Link
        href={"/chatbot"}
        onClick={() => {
          setActive(window.location.origin + "/chatbot");
        }}
        className="hover:bg-base-200"
      >
        <Bot />
      </Link>

      <Link
        href={"/notes"}
        onClick={() => {
          setActive(window.location.origin + "/notes");
        }}
        className="hover:bg-base-200"
      >
        <NotebookPen />
      </Link>
    </>
  );
};

export default BottomNavButtons;
