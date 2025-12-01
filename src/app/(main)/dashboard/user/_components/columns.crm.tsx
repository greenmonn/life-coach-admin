import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { conversationSchema } from "./schema";

export const conversationSchemaColumns: ColumnDef<z.infer<typeof conversationSchema>>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="대화 ID" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.id}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "participant_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="참여자 ID" />,
    cell: ({ row }) => <span>{row.original.participant_id}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="단계" />,
    cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
    enableSorting: false,
  },
  {
    accessorKey: "theme",
    header: ({ column }) => <DataTableColumnHeader column={column} title="주제" />,
    cell: ({ row }) => <Badge variant="outline">{row.original.theme}</Badge>,
    enableSorting: false,
  },
  {
    accessorKey: "message_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="메시지 수" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.message_count}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "last_activity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="마지막 활동 후 시간" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.last_activity}</span>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" className="text-muted-foreground flex size-8" size="icon">
        <EllipsisVertical />
        <span className="sr-only">Open menu</span>
      </Button>
    ),
    enableSorting: false,
  },
];
