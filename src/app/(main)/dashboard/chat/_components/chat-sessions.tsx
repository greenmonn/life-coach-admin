"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  name: string;
  endTime: string;
  messages: ChatMessage[];
}

interface ChatSessionsProps {
  userId: string;
  sessions: ChatSession[];
}

export function ChatSessions({ userId, sessions }: ChatSessionsProps) {
  const [activeSessionId, setActiveSessionId] = useState(sessions[0]?.id || "");
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <div className="flex flex-col gap-4">
      {/* User ID Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">User ID:</h2>
        <span className="text-2xl font-mono text-primary">{userId}</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat Sessions</CardTitle>
          <CardDescription>View conversation history across different sessions</CardDescription>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          {/* Session Selector */}
          <div className="flex items-center gap-4">
            <label htmlFor="session-select" className="text-sm font-medium whitespace-nowrap">
              Select Session:
            </label>
            <Select value={activeSessionId} onValueChange={setActiveSessionId}>
              <SelectTrigger id="session-select" className="w-full max-w-md">
                <SelectValue placeholder="Select a session" />
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
            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
              {activeSession.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg p-4 max-w-[80%]",
                    message.sender === "user"
                      ? "self-end bg-primary text-primary-foreground"
                      : "self-start bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">
                      {message.sender === "user" ? "User" : "Assistant"}
                    </span>
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
