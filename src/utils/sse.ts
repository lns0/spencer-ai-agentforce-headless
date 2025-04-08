"use client";

type StreamingMessageProps = {
  text: string;
  sequenceId: number;
  sessionId: string;
  onProgress: (message: string) => void;
  onChunk: (message: string, offset: number) => void;
  onInform: (message: string) => void;
  onComplete: () => void;
};

export const sendStreamingMessage = async ({
  text,
  sequenceId,
  sessionId,
  onProgress,
  onChunk,
  onInform,
  onComplete,
}: StreamingMessageProps) => {
  try {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        message: text,
        sequenceId,
        sessionId,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error("Response body is null");
    }

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      const lines = decoder.decode(value).split(/\n/);
      if (lines.length !== 5) continue;

      try {
        const eventData = JSON.parse(lines[2].replace(/^data:\s*/, ""));
        const { type, message } = eventData.message;

        switch (type) {
          case "ProgressIndicator":
            onProgress(message);
            break;
          case "TextChunk":
            onChunk(message, eventData.offset);
            break;
          case "Inform":
            onInform(message);
            break;
          case "EndOfTurn":
            onComplete();
            break;
        }
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    }
  } catch (error) {
    console.error("Error in sendStreamingMessage:", error);
    throw error;
  }
};
