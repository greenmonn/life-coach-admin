"use client";

import { Plus, BookOpen } from "lucide-react";

import { CircleCheck, Loader } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const lastActivity = "Active";

const readThemes = [
  {
    id: "acceptance",
    title: "수용과 마음챙김",
    pagesRead: 2,
    totalPages: 5,
  },
  {
    id: "values",
    title: "가치 발견하기",
    pagesRead: 5,
    totalPages: 5,
  },
  {
    id: "mindfulness",
    title: "현재 순간에 머무르기",
    pagesRead: 3,
    totalPages: 6,
  },
  {
    id: "defusion",
    title: "생각과 거리두기",
    pagesRead: 1,
    totalPages: 4,
  },
];

export function UserOverview() {
  return (
    <Card className="shadow-xs">
      <CardHeader className="items-center">
        <CardTitle>참여자 정보</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button size="icon" variant="outline">
            <Plus className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
            <div className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">활성 사용자 여부 (최근 일주일 내 접속 여부)</span>
                  <span className="font-medium tabular-nums">
                    <Badge variant="outline" className="text-muted-foreground px-1.5">
                      {lastActivity === "Active" ? (
                        <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
                      ) : (
                        <Loader />
                      )}
                      {lastActivity}
                    </Badge>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">마지막 대화 시각</span>
                  <span className="font-medium tabular-nums">2025-06-09 03:39:18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">총 완료한 대화 세션 수</span>
                  <span className="font-medium">5</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h6 className="text-muted-foreground text-sm uppercase">읽은 주제문 목록</h6>

                <div className="space-y-4">
                  {readThemes.map((theme) => (
                    <div key={theme.id} className="flex items-center gap-2">
                      <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                        <BookOpen className="size-5" />
                      </div>
                      <div className="flex w-full items-end justify-between">
                        <div>
                          <p className="text-sm font-medium">{theme.title}</p>
                          <p className="text-muted-foreground line-clamp-1 text-xs"><Badge variant="outline">{theme.id}</Badge></p>
                        </div>
                        <div>
                          <span
                            className={cn(
                              "text-sm leading-none font-medium tabular-nums",
                              theme.pagesRead === theme.totalPages ? "text-green-500" : "text-muted-foreground",
                            )}
                          >
                            {theme.pagesRead}/{theme.totalPages}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
      </CardContent>
    </Card>
  );
}
