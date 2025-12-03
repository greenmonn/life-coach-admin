"use client";

import { useMemo } from "react";

import { Download } from "lucide-react";
import z from "zod";

import { DataTable } from "@/components/data-table/data-table";
// import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { themeSchemaColumns } from "./columns.crm";
import { themeSchema } from "./schema";
import { exportToCSV } from "@/lib/export-utils";

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

  const handleExport = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const rowsToExport = selectedRows.length > 0
      ? selectedRows
      : table.getFilteredRowModel().rows;

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `themes_${timestamp}.csv`;
    
    exportToCSV(rowsToExport, themeSchemaColumns, filename);
  };

  const paginationKey = useMemo(() => {
      const pagination = table.getState().pagination;
      const selectedRows = table.getFilteredSelectedRowModel().rows.length;
      return `${pagination.pageIndex}-${pagination.pageSize}-${selectedRows}`;
    }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize, table.getFilteredSelectedRowModel().rows.length]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>주제문</CardTitle>
        <CardDescription>챗봇에 포함된 주제문을 확인할 수 있습니다.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            {/* <DataTableViewOptions table={table} /> */}
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download />
              <span className="hidden lg:inline">Export</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex size-full flex-col gap-4">
          <DataTable table={table} columns={themeSchemaColumns} key={paginationKey} />
      </CardContent>
    </Card>
  );
}
