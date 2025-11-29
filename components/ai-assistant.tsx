"use client";

import { useState } from "react";
import { Send, Bot } from "lucide-react";

export default function AIAssistant({ lastTx, lastPrice, lastUsers }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m SomniaAI — ask me anything about live network activity." }
  ]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    // CALL YOUR API ROUTE
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({
        message: userMessage,
        lastTx,
        lastPrice,
        lastUsers
      })
    });

    const data = await res.json();

    setMessages(prev => [...prev, { from: "bot", text: data.reply }]);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-cyan-600 text-white shadow-xl hover:bg-cyan-500 transition"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-xl flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-white font-semibold">SomniaAI Assistant</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>

          <div className="p-4 space-y-3 h-80 overflow-y-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  m.from === "bot"
                    ? "bg-gray-800 text-cyan-300"
                    : "bg-cyan-600 text-white ml-auto"
                } max-w-[85%]`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none"
              placeholder="Ask about activity..."
            />
            <button
              onClick={sendMessage}
              className="bg-cyan-600 px-3 rounded-lg hover:bg-cyan-500"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
