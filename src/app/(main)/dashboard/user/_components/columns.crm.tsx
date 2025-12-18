import { useMemo } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { STAGE_COLORS } from "@/lib/constants";

import { conversationSchema } from "./schema";

export function useConversationColumns() {
  return useMemo<ColumnDef<z.infer<typeof conversationSchema>>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => {
                console.log(value);
                table.toggleAllPageRowsSelected(!!value);
              }}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                console.log(value);
                row.toggleSelected(!!value);
              }}
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
      // {
        //   accessorKey: "participant_id",
        //   header: ({ column }) => <DataTableColumnHeader column={column} title="참여자 ID" />,
        //   cell: ({ row }) => <span>{row.original.participant_id}</span>,
        //   enableSorting: false,
        //   enableHiding: false,
        // },
        {
          accessorKey: "status",
          header: ({ column }) => <DataTableColumnHeader column={column} title="단계" />,
          cell: ({ row }) => <Badge 
            className={`${STAGE_COLORS[row.original.status.toLowerCase()]?.bg} ${STAGE_COLORS[row.original.status.toLowerCase()]?.text}`}
          >{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1).toLowerCase()}</Badge>,
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
        },
        {
          accessorKey: "last_activity",
          header: ({ column }) => <DataTableColumnHeader column={column} title="마지막 활동 후 시간" />,
          cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.last_activity}</span>,
          enableSorting: false,
        },
        {
          accessorKey: "start_time",
          header: ({ column }) => <DataTableColumnHeader column={column} title="시작 시간" />,
          cell: ({ row }) => <span className="tabular-nums">{row.original.start_time}</span>,
          enableSorting: false,

        },
        {
          accessorKey: "end_time",
          header: ({ column }) => <DataTableColumnHeader column={column} title="종료 시간" />,
          cell: ({ row }) => <span className="tabular-nums">{row.original.end_time}</span>,
          enableSorting: false,
        },
        {
          accessorKey: "session_index",
          header: ({ column }) => <DataTableColumnHeader column={column} title="세션 인덱스" />,
          cell: ({ row }) => <span>{row.original.session_index}</span>,
          enableHiding: false,
        },
        // {
          //   id: "actions",
      //   cell: () => (
      //     <Button variant="ghost" className="text-muted-foreground flex size-8" size="icon">
      //       <EllipsisVertical />
      //       <span className="sr-only">Open menu</span>
      //     </Button>
      //   ),
      //   enableSorting: false,
      // },
    ],
    [],
  );
}
