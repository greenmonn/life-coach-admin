import z from "zod";

import { participantSchema } from "./schema";

export async function fetchParticipants(group_type='all'): Promise<z.infer<typeof participantSchema>[]> {
  try {
    const response = await fetch("http://34.64.253.26:8080/api/admin/participants", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return participantSchema.parse(data).participants;

  } catch (error) {
    console.error("Failed to fetch themes:", error);
    return [];
  }
}
