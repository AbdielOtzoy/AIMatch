"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatForm = ({
  genderPreference,
  session,
}: {
  genderPreference: string;
  session: Session;
}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  const nameBot = genderPreference === "men" ? "Adrian" : "Adriana";
  const imageRoute = genderPreference === "men" ? "/adrian.jpg" : "/adriana.jpg";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático hacia abajo cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:w-[800px] sm:w-[450px] w-[370px]">
      {/* Contenedor de mensajes con scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {message.role !== "user" && (
                <Avatar className="mr-3">
                  <AvatarImage
                    src={imageRoute}
                    alt={nameBot}
                    className="rounded-full w-10 h-10"
                  />
                  <AvatarFallback>{nameBot.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md p-3 rounded-xl text-white ${message.role === "user"
                  ? "bg-blue-500"
                  : "bg-gray-800 text-gray-200"
                  }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar className="ml-3">
                  <AvatarImage
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || "avatar"}
                    className="rounded-full w-10 h-10"
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-48 flex flex-1 justify-center items-center flex-col gap-4">
            <Avatar className="size-32">
              <AvatarImage
                src={imageRoute}
                alt={nameBot}
                className="rounded-full w-32 h-32"
              />
              <AvatarFallback>{nameBot.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold">Chat with {nameBot}!</h1>
          </div>
        )}
        {/* Referencia para scroll automático */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Chat Input */}
      <form
        onSubmit={handleSubmit}
        className="w-full p-3 border-t border-gray-300 flex items-center space-x-3"
      >
        <textarea
          placeholder="Type your message here..."
          value={input}
          id="message"
          name="message"
          onChange={handleInputChange}
          className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full h-10 w-10"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
