import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

import { fetchThemes } from "./crm.config";
import { TableCardsClient } from "./table-cards-client";

export async function TableCards() {
  const themeData = await fetchThemes();

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle>주제문</CardTitle>
          <CardDescription>챗봇에 포함된 주제문을 확인할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          <TableCardsClient data={themeData} />
        </CardContent>
      </Card>
    </div>
  );
}
