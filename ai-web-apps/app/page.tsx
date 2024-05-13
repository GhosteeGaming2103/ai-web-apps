import Chatbox from "@/components/ui/chatbox";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return redirect("/api/auth/signin");
  }
  return <main className=""></main>;
}
