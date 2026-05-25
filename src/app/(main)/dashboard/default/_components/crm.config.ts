import z from "zod";

import { buildAdminApiHeaders, buildLifeCoachAdminApiUrl } from "@/lib/lifecoach-api";

import { participantSchema, participantsResponseSchema } from "./schema";

export type GroupType = "all" | "chat" | "nochat";

const participantInfoResponseSchema = z.object({
  participant_info: z.object({
    total_completed_sessions: z.number(),
  }),
});

async function fetchCompletedSessionCount(participantId: string, accessKey: string): Promise<number | null> {
  try {
    const url = buildLifeCoachAdminApiUrl("participantInfo");
    url.searchParams.append("participant_id", participantId);
    url.searchParams.append("access_key", accessKey);

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const parsed = participantInfoResponseSchema.parse(data);
    return parsed.participant_info.total_completed_sessions;
  } catch (error) {
    console.error(`Failed to fetch completed session count for participant ${participantId}:`, error);
    return null;
  }
}

export async function fetchParticipants(groupType: GroupType = "all"): Promise<z.infer<typeof participantSchema>[]> {
  try {
    const url = buildLifeCoachAdminApiUrl("participants");
    url.searchParams.set("type", groupType);
    url.searchParams.set("include_access_key", "true");

    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: buildAdminApiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const parsed = participantsResponseSchema.parse(data);

    const participantsWithCompletedSessions = await Promise.all(
      parsed.participants.map(async (participant) => ({
        ...participant,
        completed_session_count: participant.access_key
          ? await fetchCompletedSessionCount(participant.id, participant.access_key)
          : null,
      })),
    );

    return participantsWithCompletedSessions;
  } catch (error) {
    console.error("Failed to fetch participants:", error);
    return [];
  }
}
