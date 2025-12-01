import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

import { fetchThemes } from "./crm.config";
import { TableCardsClient } from "./table-cards-client";

export async function TableCards() {
  const themeData = await fetchThemes();

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
        <TableCardsClient data={themeData} />
    </div>
  );
}
