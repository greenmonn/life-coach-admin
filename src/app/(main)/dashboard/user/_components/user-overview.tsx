import { fetchUser } from "./crm.config";
import { UserOverviewClient } from "./user-overview-client";

type UserOverviewProps = {
  participantId: string;
  accessKey: string;
};

export async function UserOverview({ participantId, accessKey }: UserOverviewProps) {
  const userData = await fetchUser(participantId, accessKey);

  return (
    <>
      <UserOverviewClient data={userData} />
    </>
  );
}
