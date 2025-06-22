import Image from "next/image";
import type { Message } from "@/types/globals";

export default function ChatMessage({
  type,
  message,
  aiStatus,
  isTyping,
}: Message) {
  if (type === "ai") {
    return (
      <>
        <div className="flex gap-3 pl-5 pr-20 pb-0">
          <Image
            className="w-8 h-8 rounded-full mt-1 drop-shadow-[0_0_8px_#00fff7]"
            width={100}
            height={100}
            src="/images/ai.png"
            alt={type}
          />
          {isTyping && message.length === 0 ? (
            <div className="flex items-center gap-2 pb-0">
              <div className="pl-2">
                <div className="animate-spin h-3 w-3 bg-neoncyan rounded-sm shadow-neon"></div>
              </div>
              <div className="px-1">
                {aiStatus && aiStatus.length > 0 && (
                  <p className="text-sm font-orbitron neon-text">
                    {aiStatus}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div
              className={
                isTyping
                  ? "flex flex-col p-3 glass neon-border text-neoncyan font-orbitron animate-gradient-x"
                  : "flex flex-col p-3 glass neon-border text-neoncyan font-orbitron animate-gradient-x"
              }
              style={{background: 'linear-gradient(90deg, rgba(0,255,247,0.12) 0%, rgba(255,0,234,0.10) 100%)'}}
            >
              <p className="text-sm font-extralight whitespace-pre-wrap">
                {message}
                {isTyping && <span className="animate-pulse">_</span>}
              </p>
            </div>
          )}
        </div>
      </>
    );
  } else if (type === "user") {
    return (
      <>
        <div className="flex flex-row-reverse gap-3 pl-20 pr-5">
          <Image
            className="w-8 h-8 rounded-full mt-1 drop-shadow-[0_0_8px_#ff00ea]"
            width={100}
            height={100}
            src="/images/user.png"
            alt={type}
          />
          <div className="flex flex-col p-3 glass border border-neonpink text-neonpink font-sharetech animate-gradient-x" style={{background: 'linear-gradient(90deg, rgba(255,0,234,0.10) 0%, rgba(0,255,247,0.12) 100%)'}}>
            <p className="text-sm font-extralight whitespace-pre-wrap">
              {message}
            </p>
          </div>
        </div>
      </>
    );
  }
  return <></>;
}
