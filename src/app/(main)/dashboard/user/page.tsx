import { InsightCards } from "./_components/insight-cards";
import { OperationalCards } from "./_components/operational-cards";
import { UserOverview } from "./_components/user-overview";
import { TableCards } from "./_components/table-cards";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-4 lg:col-span-1">
        <UserOverview />
      </div>
      <TableCards />
    </div>
  );
}
