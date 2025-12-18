"use client";

import * as React from "react";

import { z } from "zod";

import { BookOpen, CircleCheck, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { userSchema } from "./schema";

export function UserOverviewClient({ data: userData }: { data: z.infer<typeof userSchema> }) {
  const [data, setData] = React.useState(() => userData);
  const lastActivityText = data.is_active ? "Active" : "Inactive";

  const formatMarkdown = (markdownText: string | undefined | null) => {
    if (!markdownText) return "N/A";
    // 마크다운 줄바꿈(두 번)이나 일반 줄바꿈(한 번)을 <br>로 변환하여 간단히 렌더링
    return markdownText.split('\n').map((line, index) => (
      <React.Fragment key={index}>
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
                  <span className="font-medium tabular-nums"><pre>{data.access_key}</pre></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">대화 UUID</span>
                  <span className="font-medium tabular-nums"><pre>{data.conversation_uuid ?? "N/A"}</pre></span>
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
                
                <div className={cn(
                    "p-3 bg-muted rounded-lg shadow-inner",
                    "text-sm"
                )}> 
                  
                  <div className="flex items-baseline gap-2"> 
                    <span className="text-primary text-base font-extrabold shrink-0">•</span> 
                    <p className="font-medium whitespace-pre-wrap flex-1 leading-relaxed">
                        <span className="font-bold text-primary mr-1">A1:</span>
                        {data.initial_survey_answers.A1 || "N/A"}
                    </p>
                  </div>
                  
                  <div className="flex items-baseline gap-2"> 
                    <span className="text-primary text-base font-extrabold shrink-0">•</span>
                    <p className="font-medium whitespace-pre-wrap flex-1 leading-relaxed">
                        <span className="font-bold text-primary mr-1">A2:</span>
                        {data.initial_survey_answers.A2 || "N/A"}
                    </p>
                  </div>
                  
                </div>
              </div>

              {/* 💡 유저 모델 (임상 노트) 섹션 수정: 스크롤 적용 */}
              <div className="space-y-4">
                <h6 className="text-muted-foreground text-sm uppercase">유저 모델 (임상 노트)</h6>
                <div className={cn(
                    "p-3 bg-muted rounded-lg shadow-inner",
                    "max-h-60 overflow-y-auto" // 👈 스크롤 클래스 추가
                  )}
                >
                  {/* MarkDown의 헤더/리스트 등을 시각적으로 구분하기 위해 p 대신 div 사용 */}
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {formatMarkdown(data.clinical_note)}
                  </div>
                </div>
              </div>


              <div className="space-y-4">
                <h6 className="text-muted-foreground text-sm uppercase">읽은 주제문 목록</h6>

                <div className="space-y-4">
                  {data.read_themes.map((theme) => {
                    const isCompleted = theme.pages_read === theme.total_pages;
                    return (
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
                                  isCompleted ? "text-green-500" : "text-muted-foreground",
                                )}
                              >
                                {theme.pages_read}/{theme.total_pages}
                              </span>
                            </div>
                          </div>
                        </div>
                    )
                  })}
                </div>
              </div>
            </div>
      </CardContent>
    </Card>
  );
}