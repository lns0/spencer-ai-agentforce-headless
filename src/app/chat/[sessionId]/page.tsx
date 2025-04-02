import ChatContainer from "@/components/ChatContainer";
import Header from "@/components/ChatHeader";
import { getSession } from "@/utils/agentforce";

export default async function ChatPage() {
  const session = await getSession();
  const welcomeMessage = session.messages[0].message;

  return (
    <>
      <Header />
      <ChatContainer welcomeMessage={welcomeMessage} />
    </>
  );
}
