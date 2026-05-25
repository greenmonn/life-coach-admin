"use client";

import * as React from "react";
import { useMemo } from "react";

import { useRouter } from "next/navigation";

import { Row } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { z } from "zod";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { exportToCSV } from "@/lib/export-utils";

import { useConversationColumns } from "./columns.crm";
import { conversationSchema } from "./schema";

interface TableCardsClientProps {
  data: z.infer<typeof conversationSchema>[];
  participantId: string;
  accessKey: string;
  enrolledDate: string | null;
}

function parseSessionDate(value: string | null | undefined): Date | null {
  if (!value || value === "N/A") return null;

  const normalizedValue = value.includes("/") ? value.replace("/", "T") : value;
  const parsedDate = new Date(normalizedValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function parseEnrolledDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const parsedDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function formatWeekRange(startDate: Date, endDate: Date): string {
  return `${new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
  }).format(startDate)} - ${new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
  }).format(endDate)}`;
}

function getWeeklyCompletion(enrolledDate: string | null | undefined, sessions: z.infer<typeof conversationSchema>[]) {
  const enrollmentStart = parseEnrolledDate(enrolledDate);
  if (!enrollmentStart) return null;

  const weeklySessions = Array.from({ length: 4 }, (_, index) => {
    const weekStart = new Date(enrollmentStart);
    weekStart.setDate(enrollmentStart.getDate() + index * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    return {
      weekNumber: index + 1,
      weekStart,
      weekEnd,
      completedCount: 0,
      targetCount: 3,
    };
  });

  sessions.forEach((session) => {
    const sessionDate = parseSessionDate(session.end_time);
    if (!sessionDate) return;

    const weekIndex = weeklySessions.findIndex((week) => sessionDate >= week.weekStart && sessionDate <= week.weekEnd);
    if (weekIndex === -1) return;

    const targetWeek = weeklySessions.at(weekIndex);
    if (!targetWeek) return;

    targetWeek.completedCount += 1;
  });

  return weeklySessions;
}

export function TableCardsClient({
  data: conversationData,
  participantId,
  accessKey,
  enrolledDate,
}: TableCardsClientProps) {
  const [data] = React.useState(() => conversationData);
  const conversationSchemaColumns = useConversationColumns();
  const router = useRouter();
  const weeklyCompletion = useMemo(() => getWeeklyCompletion(enrolledDate, data), [enrolledDate, data]);
  const completedWeekCount = useMemo(
    () => weeklyCompletion?.filter((week) => week.completedCount >= week.targetCount).length ?? 0,
    [weeklyCompletion],
  );

  const table = useDataTableInstance({
    data,
    columns: conversationSchemaColumns,
    getRowId: (row) => row.id.toString(),
  });

  const handleExport = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const rowsToExport = selectedRows.length > 0 ? selectedRows : table.getFilteredRowModel().rows;

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `conversations_${timestamp}.csv`;

    exportToCSV(rowsToExport, conversationSchemaColumns, filename);
  };

  const pagination = table.getState().pagination;
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  const paginationKey = `${pagination.pageIndex}-${pagination.pageSize}-${selectedRowCount}`;

  const handleRowClick = React.useCallback(
    (row: Row<z.infer<typeof conversationSchema>>) => {
      const conversationUuid = row.original.conversation_uuid;
      const sessionIndex = row.original.session_index;
      if (!conversationUuid) return;
      const url = `/dashboard/chat?participantId=${encodeURIComponent(participantId)}&accessKey=${encodeURIComponent(accessKey)}&conversationUuid=${encodeURIComponent(conversationUuid)}&sessionIndex=${encodeURIComponent(sessionIndex)}`;
      router.push(url);
    },
    [router, participantId, accessKey],
  );

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
          <div className="bg-muted/30 rounded-2xl border px-4 py-4">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">4주 참여 진행 현황</div>
                <div className="text-muted-foreground text-xs">등록일 기준 매주 3회 사용 목표</div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {enrolledDate ? <div className="text-muted-foreground">시작일: {enrolledDate}</div> : null}
                <div className="bg-background rounded-full border px-3 py-1 font-medium">
                  목표 달성 주차 수: {completedWeekCount}주
                </div>
              </div>
            </div>

            {weeklyCompletion ? (
              <div className="grid gap-3 md:grid-cols-2">
                {weeklyCompletion.map((week) => (
                  <div key={week.weekNumber} className="bg-background rounded-xl border px-3 py-3">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="text-sm font-medium">{week.weekNumber}주차</div>
                      <div className="text-xs font-medium">
                        {week.completedCount >= week.targetCount ? "완료" : "진행 중"}
                      </div>
                    </div>
                    <div className="text-muted-foreground mb-2 text-xs">
                      {formatWeekRange(week.weekStart, week.weekEnd)}
                    </div>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: week.targetCount }, (_, dotIndex) => {
                        const isFilled = dotIndex < Math.min(week.completedCount, week.targetCount);
                        return (
                          <span
                            key={dotIndex}
                            className={
                              isFilled
                                ? "h-3.5 w-3.5 rounded-full border border-emerald-500 bg-emerald-500"
                                : "border-muted-foreground/30 h-3.5 w-3.5 rounded-full border bg-transparent"
                            }
                          />
                        );
                      })}
                      <span className="text-muted-foreground ml-1 text-xs">
                        {Math.min(week.completedCount, week.targetCount)}/{week.targetCount}
                      </span>
                      {week.completedCount > week.targetCount ? (
                        <span className="text-muted-foreground text-xs">
                          (+{week.completedCount - week.targetCount})
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">
                등록일 정보가 없어 주차별 참여 현황을 계산할 수 없습니다.
              </div>
            )}
          </div>

          <DataTable
            table={table}
            key={paginationKey}
            columns={conversationSchemaColumns}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
}
