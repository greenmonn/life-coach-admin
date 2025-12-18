import { UserOverview } from "./_components/user-overview";
import { TableCards } from "./_components/table-cards";
import { ParticipantSelector } from "./_components/participant-selector";
import { fetchParticipants } from "../default/_components/crm.config";

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
  const participantId = resolvedParams?.participantId;
  const accessKey = resolvedParams?.accessKey;

  if (!participantId || !accessKey) {
    const participants = await fetchParticipants("all");
    return (
      <div className="flex flex-col gap-4 md:gap-6">
        <ParticipantSelector participants={participants} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-4 lg:col-span-1">
        <UserOverview participantId={participantId} accessKey={accessKey} />
      </div>
      <TableCards participantId={participantId} accessKey={accessKey} />
    </div>
  );
}
