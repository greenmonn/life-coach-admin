import { fetchConversations } from "./crm.config";
import { TableCardsClient } from "./table-cards-client";

type TableCardsProps = {
  participantId: string;
  accessKey: string;
};

export async function TableCards({ participantId, accessKey }: TableCardsProps) {
  const conversationData = await fetchConversations(participantId, accessKey);

  return (
    <>
      <TableCardsClient
        data={conversationData}
        participantId={participantId}
        accessKey={accessKey}
      />
    </>
  );
}
