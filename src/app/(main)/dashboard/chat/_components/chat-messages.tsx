"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat Messages</CardTitle>
        <CardDescription>View conversation history</CardDescription>
      </CardHeader>
      <CardContent className="flex size-full flex-col gap-4">
        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
          {messages.map((message) => (
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
      </CardContent>
    </Card>
  );
}
