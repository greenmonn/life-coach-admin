import z from "zod";

import { buildAdminApiHeaders, buildLifeCoachAdminApiUrl } from "@/lib/lifecoach-api";

import { participantSchema, participantsResponseSchema } from "./schema";

export type GroupType = "all" | "chat" | "nochat";

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
    return parsed.participants;
  } catch (error) {
    console.error("Failed to fetch participants:", error);
    return [];
  }
}
