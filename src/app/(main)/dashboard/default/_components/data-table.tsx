"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { Download } from "lucide-react";
// import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { participantSchema } from "./schema";

import { useMemo } from "react";
import { exportToCSV } from "@/lib/export-utils";

export function DataTable({ data: initialData }: { data: z.infer<typeof participantSchema>[] }) {
  const [data, setData] = React.useState(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  const handleExport = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const rowsToExport = selectedRows.length > 0
      ? selectedRows
      : table.getFilteredRowModel().rows;

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `sections_${timestamp}.csv`;
    
    exportToCSV(rowsToExport, dashboardColumns, filename);
  };

  const paginationKey = useMemo(() => {
    const pagination = table.getState().pagination;
    const selectedRows = table.getFilteredSelectedRowModel().rows.length;
    return `${pagination.pageIndex}-${pagination.pageSize}-${selectedRows}`;
  }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize, table.getFilteredSelectedRowModel().rows.length]);

  return (
    <Tabs defaultValue="participants_intervention" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="participants_intervention">
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="participants_intervention">참여자 목록 (개입집단)</SelectItem>
            <SelectItem value="participants_control">참여자 목록 (대조집단)</SelectItem>
            <SelectItem value="conversation_list">챗봇 대화 목록</SelectItem>
            <SelectItem value="control_responses">대조 집단 응답</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="participants_intervention">개입 집단 참여자</TabsTrigger>
          <TabsTrigger value="participants_control">
            대조 집단 참여자 <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="conversation_list">
            챗봇 대화 목록 <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="control_responses">대조 집단 응답</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          {/* <DataTableViewOptions table={table} /> */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download />
            <span className="hidden lg:inline">Export</span>
          </Button>
          {/* <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Add Section</span>
          </Button> */}
        </div>
      </div>
      <TabsContent value="participants_intervention" className="relative flex flex-col gap-4 overflow-auto">
        <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} key={paginationKey} />
      </TabsContent>
      <TabsContent value="participants_control" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="conversation_list" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="control_responses" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}
