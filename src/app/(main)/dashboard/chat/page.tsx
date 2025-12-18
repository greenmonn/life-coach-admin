import { ChatSessions } from "./_components/chat-sessions";
import { ChatSelector } from "./_components/chat-selector";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    participantId?: string;
    accessKey?: string;
    conversationUuid?: string;
    sessionIndex?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const participantId = resolved?.participantId;
  const accessKey = resolved?.accessKey;
  const conversationUuid = resolved?.conversationUuid;
  const sessionIndex = resolved?.sessionIndex ? Number(resolved.sessionIndex) : undefined;

  if (!participantId || !accessKey || !conversationUuid) {
    return (
      <div className="flex flex-col gap-4 md:gap-6">
        <ChatSelector />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <ChatSessions
        participantId={participantId}
        accessKey={accessKey}
        conversationUuid={conversationUuid}
        sessionIndex={sessionIndex}
      />
    </div>
  );
}
