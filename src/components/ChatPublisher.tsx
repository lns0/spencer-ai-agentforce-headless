"use client";
import { useState } from "react";

type Props = {
  onPostMessage: (message: string) => void;
};

const SAMPLE_QUERIES = [
  "What is Spencer AI?",
  "What is Agentforce?",
  "How does Agentforce work with Data Cloud?",
  "What are the use cases of Agentforce?",
  "What is the difference between Agentforce and other AI agents?",
  "How do I know if I'm ready to use generative AI in my business?"
];

export default function ChatPublisher({ onPostMessage }: Props) {
  const [message, setMessage] = useState("");

  const submitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && message.length > 0) {
      onPostMessage(message);
      setMessage("");
    }
  };
  const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={submitted} className="w-full relative">
      <input
        type="text"
        value={message}
        autoFocus={true}
        onChange={changed}
        placeholder="Enter a message here..."
        className="glass neon-border shadow-neon text-md font-orbitron rounded-full w-full py-4 px-8 text-neoncyan bg-transparent focus:outline-none focus:shadow-[0_0_16px_#00fff7] transition-all duration-200 relative z-10"
        style={{'--tw-placeholder-opacity': 0.7} as React.CSSProperties}
      />
    </form>
  );
}
