"use client";

import { Home, Bot, NotebookPen } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect } from "react";

const BottomNavButtons = () => {
  const setActive = (val: string) => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      if (link.href == val) {
        link.classList.add("active");
      }
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const parent = event.currentTarget.parentElement;
    const element = event.currentTarget;
    if (parent) {
      const links = parent.querySelectorAll("a");
      if (links) {
        links.forEach((link) => {
          link.classList.remove("active");
        });
      }
      element.classList.toggle("active");
    }
  };
  useEffect(() => {
    setActive(window.location.href);
  }, []);
  return (
    <>
      <Link href={"/"} onClick={handleClick} className="hover:bg-base-200">
        <Home />
      </Link>
      <Link
        href={"/chatbot"}
        onClick={handleClick}
        className="hover:bg-base-200"
      >
        <Bot />
      </Link>

      <Link href="/notes" onClick={handleClick} className="hover:bg-base-200">
        <NotebookPen />
      </Link>
    </>
  );
};

export default BottomNavButtons;
