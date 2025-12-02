"use client";

import { Download } from "lucide-react";
import z from "zod";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { themeSchemaColumns } from "./columns.crm";
import { themeSchema } from "./schema";

interface TableCardsClientProps {
  data: z.infer<typeof themeSchema>[];
}

export function TableCardsClient({ data }: TableCardsClientProps) {
  const table = useDataTableInstance({
    data,
    columns: themeSchemaColumns,
    getRowId: (row) => row.id.toString(),
    defaultPageSize: 10,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>주제문</CardTitle>
        <CardDescription>챗봇에 포함된 주제문을 확인할 수 있습니다.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} />
            <Button variant="outline" size="sm">
              <Download />
              <span className="hidden lg:inline">Export</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex size-full flex-col gap-4">
        <div className="overflow-hidden rounded-md border">
          <DataTable table={table} columns={themeSchemaColumns} />
        </div>
        <DataTablePagination table={table} />
      </CardContent>
    </Card>
  );
}
