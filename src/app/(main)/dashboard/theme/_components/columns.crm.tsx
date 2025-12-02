import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { themeSchema } from "./schema";

export const themeSchemaColumns: ColumnDef<z.infer<typeof themeSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title=" ID" />,
    cell: ({ row }) => <span className="font-mono">{row.original.id}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "theme_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Theme ID" />,
    cell: ({ row }) => <span className="font-mono">{row.original.theme_id}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="제목" />,
    cell: ({ row }) => <Badge variant="outline">{row.original.title}</Badge>,
    enableSorting: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="카테고리" />,
    cell: ({ row }) => <Badge variant="secondary">{row.original.category}</Badge>,
    enableSorting: false,
  },
  {
    accessorKey: "chunk_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="페이지 수" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.chunk_count}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "suggest_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="추천 횟수" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.suggest_count}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "read_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="읽은 횟수" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.read_count}</span>,
    enableSorting: false,
  },
];
