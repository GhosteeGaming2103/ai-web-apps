import ChatBotCard from "@/components/home/ChatBotCard";
import NoteCard from "@/components/home/NoteCard";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main className="">
      <div className="w-100">
        <h1 className="text-center text-3xl font-bold">
          Alternate Intelligence
        </h1>
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mt-5 lg:mx-4 max-h-[75%]">
          <ChatBotCard />
          <NoteCard />
        </div>
      </div>
    </main>
  );
}
