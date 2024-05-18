"use client";
import ChatBotCard from "@/components/home/ChatBotCard";
import NoteCard from "@/components/home/NoteCard";
import { setActive } from "@/components/ui/bottomNavButtons";
import { Bot, Notebook } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default async function Home() {
  useEffect(() => {
    setActive(window.location.href);
  }, []);
  return (
    <div className="h-[50%] pb-20">
      <div className="text-center">
        <h1 className="text-2xl">Alternate Intelligence </h1>
        <p className=" mt-2 text-sm">
          A place to store your thoughts and talk to a bot
        </p>
      </div>
      <div className="flex flex-col items-center mt-5">
        <Link
          href={"/chatbot"}
          className="bg-slate-600 w-3/4 rounded-lg text-left p-3 m-3 pt-5"
        >
          <h1 className="text-2xl">
            Talk with a Bot
            <span className="inline-block ml-10">
              <Bot className="scale-[200%]" />
            </span>
          </h1>
          <br />
          <p className="text-sm">
            Ask the bot anything and it will respond. It also has the ability to
            keep a history during the session so you dont have to worry about
            losing your conversation while you continue to explore the rest of
            the app.
          </p>
        </Link>
        <Link
          href={"/notes"}
          className="bg-slate-600 w-3/4 rounded-lg text-left p-3 m-3 pt-5"
        >
          <h1 className="text-2xl">
            Ai Notes.
            <span className="inline-block ml-10">
              <Notebook className="scale-[200%]" />
            </span>
          </h1>
          <br />
          <p className="text-sm">
            A place to store your thoughts. If you dont think your note is
            getting the message across you can ask the bot for help by clicking
            the enhance button in the note editor.
          </p>
        </Link>
      </div>
    </div>
  );
}
