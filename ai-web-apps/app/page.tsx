import ChatBotCard from "@/components/home/ChatBotCard";
import NoteCard from "@/components/home/NoteCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return redirect("/api/auth/signin");
  }

  return (
    <main className="">
      <div className="w-100">
        <h1 className="text-center text-3xl font-bold">
          Alternate Intelligence
        </h1>
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mt-5 lg:mx-4">
          <ChatBotCard />
          <NoteCard />
        </div>
      </div>
    </main>
  );
}
