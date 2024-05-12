"use client";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Message } from "@/interfaces/chatbot";
import axios, { Axios } from "axios";

const Chatbox = () => {
  const [loading, setLoading] = useState(true);
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
    setText("");
    setLoading(true);
    if (text.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "right", message: text },
    ]);
    let result = await axios.post("http://localhost:8080/", {
      content: text,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "left", message: result.data },
    ]);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setLoading(false);
    if (containerRef.current) {
      console.log(containerRef.current);
      // Scroll to the bottom of the container
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  return (
    <>
      <div className="bg-base-100 w-screen h-screen ">
        <div
          ref={containerRef}
          className="bg-base-300 w-11/12 h-[75%] max-h-[75%] mx-auto overflow-y-scroll flex flex-col flex-col-reverse chat-container"
        >
          <div className="flex flex-col w-full justify-end pb-5 px-3 ">
            {messages.map((message, index) => {
              switch (message.user) {
                case "left":
                  return (
                    <div key={index} className="chat chat-start">
                      <div
                        key={index}
                        className="chat-bubble chat-bubble-secondary"
                      >
                        {message.message}
                      </div>
                    </div>
                  );
                case "right":
                  return (
                    <div key={index} className="chat chat-end">
                      <div
                        key={index}
                        className="chat-bubble chat-bubble-primary"
                      >
                        {message.message}
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
