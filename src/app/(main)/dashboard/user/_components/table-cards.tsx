import { fetchConversations } from "./crm.config";
import { TableCardsClient } from "./table-cards-client";

export async function TableCards() {
  const conversationData = await fetchConversations("Ptestuser_share_IG", "8abe0224-ea3b-4efd-94c7-a5cd748210ae"); // TODO: pass actual participant ID and access key

  return (
    <>
      <TableCardsClient data={conversationData} />
    </>
  );
}
