"use client";
import { endSession } from "@/utils/agentforce";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function ChatHeader() {
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const clickedEndSession = () => {
    endSession(sessionId);
    router.push("/");
  };

  return (
    <div className="glass flex w-full py-3 px-6 flex-row-reverse rounded-b-2xl shadow-neon border-b border-neoncyan">
      <button className="text-neoncyan text-2xl font-orbitron hover:text-neonpink focus:text-neonpink transition-all duration-200 drop-shadow-[0_0_8px_#00fff7]" onClick={clickedEndSession}>
        <span>✕</span>
      </button>
    </div>
  );
}
