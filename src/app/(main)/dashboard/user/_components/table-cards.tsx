import { fetchConversations, fetchUser } from "./crm.config";
import { TableCardsClient } from "./table-cards-client";

type TableCardsProps = {
  participantId: string;
  accessKey: string;
};

export async function TableCards({ participantId, accessKey }: TableCardsProps) {
  const [conversationData, userData] = await Promise.all([
    fetchConversations(participantId, accessKey),
    fetchUser(participantId, accessKey),
  ]);

  return (
    <TableCardsClient
      data={conversationData}
      participantId={participantId}
      accessKey={accessKey}
      enrolledDate={userData.enrolled_date ?? null}
    />
  );
}
