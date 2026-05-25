import { fetchParticipants } from "../default/_components/crm.config";

import { fetchConversations, fetchUser } from "./_components/crm.config";
import { ParticipantSelector } from "./_components/participant-selector";
import { TableCardsClient } from "./_components/table-cards-client";
import { UserOverviewClient } from "./_components/user-overview-client";

// Ensure this page renders per-request so query params are available at runtime
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    participantId?: string;
    accessKey?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const participantId = resolvedParams.participantId;
  const accessKey = resolvedParams.accessKey;

  if (!participantId || !accessKey) {
    const participants = await fetchParticipants("all");
    return (
      <div className="flex flex-col gap-4 md:gap-6">
        <ParticipantSelector participants={participants} />
      </div>
    );
  }

  const [userData, conversationData] = await Promise.all([
    fetchUser(participantId, accessKey),
    fetchConversations(participantId, accessKey),
  ]);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-4 lg:col-span-1">
        <UserOverviewClient data={userData} />
      </div>
      <TableCardsClient
        data={conversationData}
        participantId={participantId}
        accessKey={accessKey}
        enrolledDate={userData.enrolled_date ?? null}
      />
    </div>
  );
}
