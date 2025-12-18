"use client";

import { z } from "zod";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { STAGE_COLORS } from "@/lib/constants";

import { chatHistorySchema } from "./schema";

export interface ChatMessage {
  id: string;
  sender: string;
  stage: string;
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  name: string;
  endTime: string;
  messages: ChatMessage[];
  sessionIndex: number;
}

export function ChatSessionsClient({ data: chatData, initialSessionIndex }: { data: z.infer<typeof chatHistorySchema>[]; initialSessionIndex?: number }) {
  const [sessions, setSessions] = useState(() => chatData);
  
  const initialActiveId = (() => {
    if (initialSessionIndex == null) return sessions[0]?.id || "";
    const matched = sessions.find((s) => s.sessionIndex === initialSessionIndex);
    return matched?.id || sessions[0]?.id || "";
  })();

  const [activeSessionId, setActiveSessionId] = useState(initialActiveId);
  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const userId = sessions[0]?.participantId || "N/A";

  const getSenderLabel = (sender: ChatMessage["sender"]) => {
    switch (sender) {
      case "Client":
        return "User";
      case "Coach":
        return "Coach (SIA)";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* User ID Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">참여자 ID:</h2>
        <span className="text-2xl font-mono text-primary">{userId}</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>대화 기록</CardTitle>
          <CardDescription>참여자의 각 세션별 대화 내용을 확인할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          {/* Session Selector */}
          <div className="flex items-center gap-4">
            <label htmlFor="session-select" className="text-sm font-medium whitespace-nowrap">
              세션 선택:
            </label>
            <Select value={activeSessionId} onValueChange={setActiveSessionId}>
              <SelectTrigger id="session-select" className="w-full max-w-md">
                <SelectValue placeholder="세션을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{session.id}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">Ended: {session.endTime}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Session Info */}
          {activeSession && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground border-b pb-3">
              <span className="font-medium">Session ID:</span>
              <span className="font-mono">{activeSession.id}</span>
              <span>•</span>
              <span>Ended: {activeSession.endTime}</span>
              <span>•</span>
              <span>{activeSession.messages.length} messages</span>
            </div>
          )}

          {/* Messages */}
          {activeSession && (
            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
              {activeSession.messages.map((message) => {
                const stageKey = message.stage ? message.stage.toLowerCase() : 'default';
                const colors = STAGE_COLORS[stageKey] || STAGE_COLORS.default; // 색상 선택 로직
                
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col gap-1 rounded-lg p-4 max-w-[80%]",
                      message.sender === "user" || message.sender === "Client"
                        ? "self-end bg-primary text-primary-foreground"
                        : "self-start bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">
                        {getSenderLabel(message.sender)}
                      </span>
                      
                      {message.stage && (
                        <Badge 
                          className={cn(
                            "px-2 py-0 h-4 text-[10px] font-medium uppercase border-none", // border-none 추가
                            colors.bg,  // 동적으로 배경색 적용
                            colors.text // 동적으로 텍스트색 적용
                          )}
                        >
                          {message.stage}
                        </Badge>
                      )}
                      
                      <span className="text-xs opacity-70">
                          {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}