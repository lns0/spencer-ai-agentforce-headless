export type Message = {
  type: "ai" | "user";
  message: string;
  aiStatus?: string;
  isTyping?: boolean;
};
