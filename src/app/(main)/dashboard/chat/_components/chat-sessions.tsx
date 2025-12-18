import { fetchConversations } from "./crm.config";
import { ChatSessionsClient } from "./chat-sessions-client";

type ChatSessionsProps = {
  participantId: string;
  accessKey: string;
  conversationUuid: string;
  sessionIndex?: number;
};

export async function ChatSessions({ participantId, accessKey, conversationUuid, sessionIndex }: ChatSessionsProps) {
  const conversationData = await fetchConversations(participantId, accessKey, conversationUuid);

  return (
    <>
      <ChatSessionsClient data={conversationData} initialSessionIndex={sessionIndex} />
    </>
  )
}
