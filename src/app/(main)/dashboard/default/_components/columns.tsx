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
import { TableCellViewer } from "./table-cell-viewer";

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
      return <TableCellViewer item={row.original} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: "access_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="접속 횟수" />,
    cell: ({ row }) => {
      return <p>{row.original.access_count}</p>;
    },
    enableSorting: false,
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
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="대화 수" />,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.id}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-session_count`} className="sr-only">
          대화 수
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.session_count}
          id={`${row.original.id}-session_count`}
        />
      </form>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "days_after_last_activity",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="마지막 접속 이후 지난 일수" />,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.id}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-days_after_last_activity`} className="sr-only">
          Limit
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.days_after_last_activity}
          id={`${row.original.id}-days_after_last_activity`}
        />
      </form>
    ),
    enableSorting: false,
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
