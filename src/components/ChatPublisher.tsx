"use client";
import { useState, useEffect, useRef } from "react";

type Props = {
  onPostMessage: (message: string) => void;
};

const SAMPLE_QUERIES = [
  "What is Spencer AI?",
  "What is Agentforce?",
  "How does Agentforce work with Data Cloud?",
  "What are the use cases of Agentforce?",
  "What is the difference between Agentforce and other AI agents?",
];

export default function ChatPublisher({ onPostMessage }: Props) {
  const [message, setMessage] = useState("");
  const [sampleIdx, setSampleIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSampleIdx((idx) => (idx + 1) % SAMPLE_QUERIES.length);
        setFade(true);
      }, 400); // fade out before switching
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
        placeholder={""}
        className="glass neon-border shadow-neon text-md font-orbitron rounded-full w-full py-4 px-8 text-neoncyan bg-transparent focus:outline-none focus:shadow-[0_0_16px_#00fff7] transition-all duration-200 relative z-10"
        style={{'--tw-placeholder-opacity': 0.} as React.CSSProperties}
      />
      {message === "" && (
        <span
          className={`pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 font-orbitron text-lg font-bold transition-opacity duration-400 ${fade ? 'opacity-100' : 'opacity-0'}`}
          style={{
            opacity: fade ? 0.7 : 0,
            color: '#e0e7ef',
            letterSpacing: '0.01em',
          }}
        >
          {SAMPLE_QUERIES[sampleIdx]}
        </span>
      )}
    </form>
  );
}
