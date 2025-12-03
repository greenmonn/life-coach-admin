"use client";

import { Download } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
// import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { exportToCSV } from "@/lib/export-utils";

import { useConversationColumns } from "./columns.crm";
import { useConversationData } from "./crm.config";

import { useMemo } from "react";

export function TableCards() {
  const conversationSchemaColumns = useConversationColumns();
  const conversationData = useConversationData();
  const table = useDataTableInstance({
    data: conversationData,
    columns: conversationSchemaColumns,
    getRowId: (row) => row.id.toString(),
  });

  const handleExport = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const rowsToExport = selectedRows.length > 0
      ? selectedRows
      : table.getFilteredRowModel().rows;

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `conversations_${timestamp}.csv`;
    
    exportToCSV(rowsToExport, conversationSchemaColumns, filename);
  };

  const paginationKey = useMemo(() => {
    const pagination = table.getState().pagination;
    const selectedRows = table.getFilteredSelectedRowModel().rows.length;
    return `${pagination.pageIndex}-${pagination.pageSize}-${selectedRows}`;
  }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize, table.getFilteredSelectedRowModel().rows.length]);

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle>대화 세션 목록</CardTitle>
          <CardDescription>지금까지 참여자가 챗봇과 나눈 대화를 확인할 수 있습니다.</CardDescription>
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
          <DataTable table={table} key={paginationKey} columns={conversationSchemaColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
