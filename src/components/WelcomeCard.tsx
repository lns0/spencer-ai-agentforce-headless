"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { newSession } from "@/utils/agentforce";
import ChatPublisher from "@/components/ChatPublisher";
import Image from "next/image";

const SAMPLE_QUERIES = [
  "What is Spencer AI?",
  "What is Agentforce?",
  "How does Agentforce work with Data Cloud?",
  "What are the use cases of Agentforce?",
];

function shuffleArray(array: string[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function SampleQueries() {
  const [queries, setQueries] = useState(SAMPLE_QUERIES);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    // Only shuffle on the client after mount
    setQueries(shuffleArray(SAMPLE_QUERIES));
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % queries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [queries.length]);
  return (
    <div className="mt-2 mb-6 flex flex-col items-center justify-center">
      <span className="text-base font-orbitron mb-1 text-white/50 tracking-wide select-none" style={{letterSpacing: '0.04em'}}>
        You can ask...
      </span>
      <span className="text-white/50 font-orbitron text-lg font-bold transition-opacity duration-500 px-4 py-1 rounded select-none" style={{letterSpacing: '0.01em'}}>
        {queries[idx]}
      </span>
    </div>
  );
}

export default function WelcomeCard() {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    doInit();
  }, []);

  const doInit = async () => {
    const { sessionId, messages } = await newSession();
    setSessionId(sessionId);
    const message = messages[0].message;
    setWelcomeMessage(message);
  };

  const postedMessage = (message: string) => {
    router.push(`/chat/${sessionId}?message=${message}`);
  };
  return (
    <div className="flex items-center justify-items-center h-full w-full sm:w-4/5 md:w-3/5 lg:w-3/5 xl:w-1/2">
      <div className="glass flex flex-col items-center justify-center gap-2 w-full rounded-3xl shadow-neon border border-neoncyan animate-pulse-slow" style={{boxShadow: '0 0 24px #00fff7, 0 0 48px #ff00ea'}}>
        <div className="py-10">
          <Image
            className="mt-1 drop-shadow-[0_0_16px_#00fff7] animate-float rounded-full object-cover"
            width={150}
            height={200}
            src="/images/spencer_ai.png"
            alt="spencer-ai"
          />
        </div>
        <div className="mb-10 text-2xl font-orbitron neon-text text-center px-4">
          {welcomeMessage ? (
            <span>{welcomeMessage}</span>
          ) : (
            <div className="py-1">
              <div className="animate-pulse w-[400px] h-4 bg-neoncyan/20 rounded-full mt-1"></div>
            </div>
          )}
        </div>
        <SampleQueries />
        <div className="flex px-3 pb-14 w-full">
          <ChatPublisher onPostMessage={postedMessage} />
        </div>
      </div>
    </div>
  );
}
