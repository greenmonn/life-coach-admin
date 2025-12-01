"use client";

import { Download } from "lucide-react";
import { useMemo } from "react";
import z from "zod";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
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

  // Create a stable key based on pagination to force DataTable re-render
  const paginationKey = useMemo(() => {
    const pagination = table.getState().pagination;
    return `${pagination.pageIndex}-${pagination.pageSize}`;
  }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize]);

  return (
    <>
      <CardAction>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            <Download />
            <span className="hidden lg:inline">Export</span>
          </Button>
        </div>
      </CardAction>
      <div className="overflow-hidden rounded-md border">
        <DataTable key={paginationKey} table={table} columns={themeSchemaColumns} />
      </div>
      <DataTablePagination key={paginationKey} table={table} />
    </>
  );
}
