"use client";

import * as React from "react";

import { BookOpen, ChevronDown, CircleCheck, Loader, MessageSquareText } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { userSchema } from "./schema";

export function UserOverviewClient({ data: userData }: { data: z.infer<typeof userSchema> }) {
  const [data] = React.useState(() => userData);
  const [expandedThemeIds, setExpandedThemeIds] = React.useState<Set<string>>(() => new Set());
  const lastActivityText = data.is_active ? "Active" : "Inactive";

  const toggleTheme = (themeId: string) => {
    setExpandedThemeIds((current) => {
      const next = new Set(current);
      if (next.has(themeId)) {
        next.delete(themeId);
      } else {
        next.add(themeId);
      }
      return next;
    });
  };

  const formatQuestionTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;

    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const formatMarkdown = (markdownText: string | undefined | null) => {
    if (!markdownText) return "N/A";
    // 마크다운 줄바꿈(두 번)이나 일반 줄바꿈(한 번)을 <br>로 변환하여 간단히 렌더링
    return markdownText.split("\n").map((line) => (
      <React.Fragment key={line}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <Card className="shadow-xs">
      <CardHeader className="items-center">
        <CardTitle>참여자 정보</CardTitle>
        <CardDescription></CardDescription>
        {/* <CardAction>
          <Button size="icon" variant="outline">
            <Plus className="size-4" />
          </Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">참여자 ID</span>
              <span className="font-medium tabular-nums">{data.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">참여자 그룹</span>
              <span className="font-medium tabular-nums">{data.group}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">총 완료한 대화 세션 수</span>
              <span className="font-medium">{data.total_completed_sessions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">마지막 대화 시각</span>
              <span className="font-medium tabular-nums">{data.last_conversation_time ?? "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">접근 키</span>
              <span className="font-medium tabular-nums">
                <pre>{data.access_key}</pre>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">대화 UUID</span>
              <span className="font-medium tabular-nums">
                <pre>{data.conversation_uuid ?? "N/A"}</pre>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">활성 사용자 여부 (최근 일주일 내 접속 여부)</span>
              <span className="font-medium tabular-nums">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                  {data.is_active ? (
                    <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
                  ) : (
                    <Loader className="size-4" />
                  )}
                  {lastActivityText}
                </Badge>
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h6 className="text-muted-foreground text-sm uppercase">초기 설문 응답</h6>

            <div className={cn("bg-muted rounded-lg p-3 shadow-inner", "text-sm")}>
              <div className="flex items-baseline gap-2">
                <span className="text-primary shrink-0 text-base font-extrabold">•</span>
                <p className="flex-1 leading-relaxed font-medium whitespace-pre-wrap">
                  <span className="text-primary mr-1 font-bold">A1:</span>
                  {data.initial_survey_answers.A1 || "N/A"}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-primary shrink-0 text-base font-extrabold">•</span>
                <p className="flex-1 leading-relaxed font-medium whitespace-pre-wrap">
                  <span className="text-primary mr-1 font-bold">A2:</span>
                  {data.initial_survey_answers.A2 || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* 💡 유저 모델 (임상 노트) 섹션 수정: 스크롤 적용 */}
          <div className="space-y-4">
            <h6 className="text-muted-foreground text-sm uppercase">유저 모델 (임상 노트)</h6>
            <div
              className={cn(
                "bg-muted rounded-lg p-3 shadow-inner",
                "max-h-60 overflow-y-auto", // 👈 스크롤 클래스 추가
              )}
            >
              {/* MarkDown의 헤더/리스트 등을 시각적으로 구분하기 위해 p 대신 div 사용 */}
              <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {formatMarkdown(data.clinical_note)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h6 className="text-muted-foreground text-sm uppercase">읽은 주제문 목록</h6>

            <div className="space-y-3">
              {data.read_themes.map((theme) => {
                const isCompleted = theme.pages_read === theme.total_pages;
                const isExpanded = expandedThemeIds.has(theme.id);
                const questions = [...theme.personal_questions].sort(
                  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
                );

                return (
                  <div key={theme.id} className="bg-background rounded-md border">
                    <button
                      type="button"
                      className="hover:bg-muted/60 flex w-full items-center gap-2 p-3 text-left transition-colors"
                      onClick={() => toggleTheme(theme.id)}
                      aria-expanded={isExpanded}
                    >
                      <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                        <BookOpen className="size-5" />
                      </div>
                      <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">{theme.title}</p>
                          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                            <Badge variant="outline">{theme.id}</Badge>
                            <span>{questions.length} questions</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span
                            className={cn(
                              "text-sm leading-none font-medium tabular-nums",
                              isCompleted ? "text-green-500" : "text-muted-foreground",
                            )}
                          >
                            {theme.pages_read}/{theme.total_pages}
                          </span>
                          <ChevronDown
                            className={cn(
                              "text-muted-foreground size-4 transition-transform",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </div>
                      </div>
                    </button>

                    {isExpanded ? (
                      <div className="bg-muted/30 border-t px-3 py-3">
                        {questions.length > 0 ? (
                          <div className="space-y-2">
                            {questions.map((question, index) => (
                              <div
                                key={`${question.timestamp}-${question.question}`}
                                className={cn(
                                  "bg-background rounded-md border p-3 text-sm",
                                  index === 0 && "border-primary/30 bg-primary/5 shadow-xs",
                                )}
                              >
                                <div className="flex items-start gap-2">
                                  <MessageSquareText
                                    className={cn(
                                      "text-muted-foreground mt-0.5 size-4 shrink-0",
                                      index === 0 && "text-primary",
                                    )}
                                  />
                                  <div className="min-w-0 flex-1 space-y-1">
                                    <p className="leading-relaxed whitespace-pre-wrap">{question.question}</p>
                                    <p className="text-muted-foreground text-xs tabular-nums">
                                      {formatQuestionTimestamp(question.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">입력된 질문이 없습니다.</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
