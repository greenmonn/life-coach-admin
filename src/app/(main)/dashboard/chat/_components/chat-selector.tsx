"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChatSelector() {
  const router = useRouter();
  const [participantId, setParticipantId] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [conversationUuid, setconversationUuid] = useState("");
  const [sessionIndex, setSessionIndex] = useState("");

  const canGo = participantId && accessKey && conversationUuid;

  const handleGo = () => {
    if (!canGo) return;
    const url = `/dashboard/chat?participantId=${encodeURIComponent(participantId)}&accessKey=${encodeURIComponent(accessKey)}&conversationUuid=${encodeURIComponent(conversationUuid)}${sessionIndex ? `&sessionIndex=${encodeURIComponent(sessionIndex)}` : ""}`;
    router.push(url);
  };

  return (
    <div className="space-y-4 rounded-md border bg-card p-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">대화 세션 선택</h2>
        <p className="text-sm text-muted-foreground">참가자 ID, Access Key, 대화 ID를 입력하면 해당 채팅을 불러옵니다.</p>
      </div>

      <div className="grid gap-3">
        <div className="space-y-2">
          <Label htmlFor="participant-id">참가자 ID</Label>
          <Input
            id="participant-id"
            placeholder="예) Ptestuser_share_IG"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="access-key">Access Key</Label>
          <Input
            id="access-key"
            placeholder="접근 키"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="conversation-id">대화 ID</Label>
          <Input
            id="conversation-id"
            placeholder="대화 UUID"
            value={conversationUuid}
            onChange={(e) => setconversationUuid(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="session-index">세션 인덱스 (선택)</Label>
          <Input
            id="session-index"
            placeholder="예) 0"
            value={sessionIndex}
            onChange={(e) => setSessionIndex(e.target.value)}
          />
        </div>
      </div>

      <Button className="w-full" onClick={handleGo} disabled={!canGo}>
        채팅 불러오기
      </Button>
    </div>
  );
}
