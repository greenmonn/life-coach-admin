"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { participantSchema } from "../../default/_components/schema";

interface ParticipantSelectorProps {
  participants: z.infer<typeof participantSchema>[];
}

export function ParticipantSelector({ participants }: ParticipantSelectorProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const filtered = useMemo(() => {
    if (!search.trim()) return participants;
    const lower = search.toLowerCase();
    return participants.filter((p) => p.id.toLowerCase().includes(lower));
  }, [participants, search]);

  const selectedParticipant = useMemo(() => filtered.find((p) => p.id === selectedId), [filtered, selectedId]);

  const handleGo = () => {
    if (!selectedParticipant?.access_key) return;
    const url = `/dashboard/user?participantId=${encodeURIComponent(selectedParticipant.id)}&accessKey=${encodeURIComponent(selectedParticipant.access_key)}`;
    router.push(url);
  };

  return (
    <div className="bg-card space-y-4 rounded-md border p-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">참가자 선택</h2>
        <p className="text-muted-foreground text-sm">조회할 참가자의 ID를 선택하거나 검색하세요.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="participant-search">참가자 검색</Label>
        <Input
          id="participant-search"
          placeholder="참가자 ID를 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>참가자 ID</Label>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger>
            <SelectValue placeholder="참가자를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {filtered.map((participant) => (
              <SelectItem key={participant.id} value={participant.id}>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{participant.id}</span>
                  <Badge variant="secondary" className="text-xs">
                    세션 {participant.session_count}
                  </Badge>
                  <span className="text-muted-foreground text-xs">접속 {participant.access_count}</span>
                  {!participant.access_key ? (
                    <Badge variant="outline" className="text-muted-foreground text-xs">
                      key 없음
                    </Badge>
                  ) : null}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedParticipant && (
        <div className="bg-muted/40 rounded-md border p-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Access Key</span>
            <span className="truncate">{selectedParticipant.access_key || "N/A"}</span>
          </div>
        </div>
      )}

      <Button onClick={handleGo} disabled={!selectedParticipant?.access_key} className="w-full">
        사용자 페이지로 이동
      </Button>
    </div>
  );
}
