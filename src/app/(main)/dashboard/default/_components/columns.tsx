import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Loader, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

import { participantSchema } from "./schema";

export const dashboardColumns: ColumnDef<z.infer<typeof participantSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="참가자 ID" />,
    cell: ({ row }) => {
      return <span className="tabular-nums">{row.original.id}</span>
    },
  },
  {
    accessorKey: "access_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="접속 횟수" />,
    cell: ({ row }) => {
      return <p>{row.original.access_count}</p>;
    },
  },
  {
    accessorKey: "recent_activity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="최근 활동" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.recent_activity === "Today" ? (
          <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
        ) : (
          <Loader />
        )}
        {row.original.recent_activity}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "session_count",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="세션 수" />,
    cell: ({ row }) => (
      <p className="max-w-sm truncate">{row.original.session_count}</p>
    ),
  },
  {
    accessorKey: "days_after_last_activity",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="마지막 접속 이후 지난 일수" />,
    cell: ({ row }) => (
      <p className="max-w-sm truncate">{row.original.days_after_last_activity ?? "N/A"}</p>
    ),
  },
  {
    accessorKey: "access_key",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="접속 키" />,
    cell: ({ row }) => (
      <p className="max-w-sm truncate">{row.original.access_key}</p>
    ),
    enableSorting: false,
  }
];
