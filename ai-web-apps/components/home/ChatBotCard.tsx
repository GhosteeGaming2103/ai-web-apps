import { Bot } from "lucide-react";
import React from "react";
import Link from "next/link";

const ChatBotCard = () => {
  return (
    <Link href="/chatbot" className="w-[90%] lg:w-1/2">
      <div className="card bg-slate-800 shadow-xl hover:scale-[102%]">
        <div className="card-body">
          <h2 className="card-title">AI Chat</h2>
          <p>
            Chat with our AI-powered chatbot and experience the future of
            communication!
          </p>
          <Bot className="mx-auto" size={128} />
        </div>
      </div>
    </Link>
  );
};

export default ChatBotCard;
