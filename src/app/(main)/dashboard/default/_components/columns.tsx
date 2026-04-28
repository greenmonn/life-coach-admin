import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Loader } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

import { participantSchema } from "./schema";

const REMINDER_TRIGGER_DAYS = 5;

function getPromptRequestedToday(data: unknown) {
  if (!data || typeof data !== "object") return false;

  const response = data as Record<string, unknown>;
  return response.error === null && response.requested_today === true;
}

function getPromptRetryAvailableToday(data: unknown) {
  if (!data || typeof data !== "object") return false;

  const response = data as Record<string, unknown>;
  return (
    response.error === null &&
    response.requested_today === false &&
    response.attempted_today === true &&
    response.retry_available === true
  );
}

function hasPromptRequestError(data: unknown) {
  if (!data || typeof data !== "object") return false;

  const response = data as Record<string, unknown>;
  return response.error !== null && response.error !== undefined;
}

function ReminderTriggerButton({ participantId, accessKey }: { participantId: string; accessKey: string }) {
  const [requestedToday, setRequestedToday] = React.useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (!accessKey) return;

    const controller = new AbortController();

    async function checkPromptRequestStatus() {
      setIsCheckingStatus(true);
      setHasError(false);

      try {
        const params = new URLSearchParams({
          participant_id: participantId,
          access_key: accessKey,
        });
        const response = await fetch(`/api/admin/participants/prompt-request/status?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to check prompt request status: ${response.status}`);
        }

        const data = await response.json();
        setRequestedToday(getPromptRequestedToday(data));
        setHasError(getPromptRetryAvailableToday(data));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsCheckingStatus(false);
        }
      }
    }

    void checkPromptRequestStatus();

    return () => controller.abort();
  }, [accessKey, participantId]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!accessKey) return;

    setIsSending(true);
    setHasError(false);

    try {
      const response = await fetch("/api/admin/participants/prompt-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participant_id: participantId,
          access_key: accessKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to request prompt: ${response.status}`);
      }

      const data = await response.json();
      if (hasPromptRequestError(data)) {
        throw new Error(String((data as { error: unknown }).error));
      }

      setRequestedToday(true);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsSending(false);
    }
  };

  const isDisabled = !accessKey || requestedToday || isCheckingStatus || isSending;
  const label = !accessKey
    ? "키 없음"
    : requestedToday
      ? "오늘 요청됨"
      : isCheckingStatus
        ? "확인 중"
        : isSending
          ? "요청 중"
          : hasError
            ? "재시도"
            : "촉구 요청";

  return (
    <Button size="sm" variant="outline" disabled={isDisabled} onClick={handleClick}>
      {label}
    </Button>
  );
}

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
      return <span className="tabular-nums">{row.original.id}</span>;
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="최근 7일 접속" />,
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={
          row.original.is_active
            ? "border-green-200 bg-green-50 px-1.5 text-green-700 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-300"
            : "text-muted-foreground px-1.5"
        }
      >
        {row.original.is_active ? (
          <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
        ) : (
          <Loader />
        )}
        {row.original.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "recent_activity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="최근 활동" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.recent_activity !== "N/A" ? (
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
    accessorKey: "enrolled_date",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="등록일" />,
    cell: ({ row }) => <p className="max-w-sm truncate tabular-nums">{row.original.enrolled_date ?? "N/A"}</p>,
  },
  {
    accessorKey: "days_after_last_activity",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="미접속 일수" />,
    cell: ({ row }) => {
      const inactiveDays = row.original.days_after_last_activity;

      return (
        <div className="flex items-center gap-2">
          <span className="tabular-nums">{inactiveDays ?? "N/A"}</span>
          {inactiveDays !== null && inactiveDays >= REMINDER_TRIGGER_DAYS ? (
            <ReminderTriggerButton participantId={row.original.id} accessKey={row.original.access_key} />
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "access_expires_at",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="접속 만료일" />,
    cell: ({ row }) => <p className="max-w-sm truncate tabular-nums">{row.original.access_expires_at ?? "N/A"}</p>,
  },
  {
    accessorKey: "access_expired",
    header: ({ column }) => <DataTableColumnHeader column={column} title="상태" />,
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={
          row.original.access_expired
            ? "border-red-200 bg-red-50 px-1.5 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            : "border-green-200 bg-green-50 px-1.5 text-green-700 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-300"
        }
      >
        {row.original.access_expired ? (
          <Loader />
        ) : (
          <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
        )}
        {row.original.access_expired ? "Expired" : "Valid"}
      </Badge>
    ),
  },
  {
    accessorKey: "access_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="접속 횟수" />,
    cell: ({ row }) => {
      return <p>{row.original.access_count}</p>;
    },
  },
  {
    accessorKey: "session_count",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="세션 수" />,
    cell: ({ row }) => <p className="max-w-sm truncate">{row.original.session_count}</p>,
  },
  {
    accessorKey: "access_key",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="접속 키" />,
    cell: ({ row }) => <p className="max-w-sm truncate">{row.original.access_key || "N/A"}</p>,
    enableSorting: false,
  },
];
