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

import { DataTable } from "../../../../../components/data-table/data-table";
import { Download } from "lucide-react";
// import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { participantSchema } from "./schema";

import { useMemo } from "react";
import { exportToCSV } from "@/lib/export-utils";

interface DataTableClientProps {
  data: z.infer<typeof participantSchema>[];
  groupType: "chat" | "nochat" | "all";
}

export function DataTableClient({ data: initialData, groupType }: DataTableClientProps) {
  const [data, setData] = React.useState(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  const handleExport = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const rowsToExport = selectedRows.length > 0
      ? selectedRows
      : table.getFilteredRowModel().rows;

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `participants_${groupType}_${timestamp}.csv`;
    
    exportToCSV(rowsToExport, dashboardColumns, filename);
  };

  const paginationKey = useMemo(() => {
    const pagination = table.getState().pagination;
    const selectedRows = table.getFilteredSelectedRowModel().rows.length;
    return `${pagination.pageIndex}-${pagination.pageSize}-${selectedRows}`;
  }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize, table.getFilteredSelectedRowModel().rows.length]);

  return (
    <>
      <div className="flex items-center justify-end gap-2">
          {/* <DataTableViewOptions table={table} /> */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download />
            <span className="hidden lg:inline">Export</span>
          </Button>
        </div>  
      <DataTable dndEnabled table={table} columns={columns} onReorder={setData} key={paginationKey} />
    </>
      
  );
}
