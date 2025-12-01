import { ChatSessions, type ChatSession } from "./_components/chat-sessions";
import data from "./_components/data.json";

export default function Page() {
  const userId = "IG-P1"; // This would come from your data source

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <ChatSessions userId={userId} sessions={data as ChatSession[]} />
    </div>
  );
}
