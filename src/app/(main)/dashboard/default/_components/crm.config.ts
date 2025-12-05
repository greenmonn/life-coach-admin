import z from "zod";

import { participantSchema, participantsResponseSchema } from "./schema";

export type GroupType = 'all' | 'chat' | 'nochat';

export async function fetchParticipants(groupType: GroupType = 'all'): Promise<z.infer<typeof participantSchema>[]> {
  try {
    const url = new URL("http://34.64.253.26:8080/api/admin/participants");
    url.searchParams.set("type", groupType);

    const response = await fetch(url.toString(), {
      cache: "no-store",
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
