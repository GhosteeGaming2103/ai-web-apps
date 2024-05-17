"use client";
import { Notebook } from "lucide-react";
import Link from "next/link";
import React from "react";
import { setActive } from "../ui/bottomNavButtons";

const NoteCard = () => {
  return (
    <Link
      href="/notes"
      className="w-[90%] lg:w-1/2"
      onClick={() => {
        setActive(window.location.origin + "/notes");
      }}
    >
      <div className="card bg-slate-800 shadow-xl hover:scale-[102%]">
        <div className="card-body">
          <h2 className="card-title">AI Chat</h2>
          <p>
            Chat with our AI-powered chatbot and experience the future of
            communication!
          </p>
          <Notebook className="mx-auto" size={128} />
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
