"use client";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Message } from "@/interfaces/chatbot";
import axios, { Axios } from "axios";

const Chatbox = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollContainer = () => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight;
      const clientHeight = containerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      containerRef.current.scrollTop = maxScrollTop + 50;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (text.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: text },
    ]);
    let msg = text;
    setText("");
    let result = await axios.post("/api/chatbot", {
      content: text,
      messages: [...messages, { role: "user", content: msg }], // Using the latest state of messages
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: result.data },
    ]);
    setLoading(false);
    setText(""); // Clearing the text input after submit
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the bottom of the container
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]); // Update scroll when messages change

  return (
    <>
      <div className="bg-base-100 w-screen h-screen ">
        <div
          ref={containerRef}
          className="bg-base-300 w-11/12 h-[65%] md:h-[80%] mx-auto overflow-y-scroll flex flex-col-reverse chat-container"
        >
          <div className="flex flex-col w-full justify-end pb-5 px-3 ">
            {messages.map((message, index) => {
              switch (message.role) {
                case "assistant":
                  return (
                    <div key={index} className="chat chat-start">
                      <div
                        key={index}
                        className="chat-bubble chat-bubble-secondary"
                      >
                        {message.content}
                      </div>
                    </div>
                  );
                case "user":
                  return (
                    <div key={index} className="chat chat-end">
                      <div
                        key={index}
                        className="chat-bubble chat-bubble-primary"
                      >
                        {message.content}
                      </div>
                    </div>
                  );
              }
            })}
            {loading && (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-secondary text-center">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-5 gap-2 justify-center">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-accent w-2/3 "
            value={text}
          />
          <button onClick={handleSubmit} className="btn btn-neutral w-1/4 ">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
