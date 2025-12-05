/* eslint-disable max-lines */

import z from "zod";

import { conversationSchema, conversationsResponseSchema } from "./schema";

export async function fetchConversations(participantId: string, accessKey: string): Promise<z.infer<typeof conversationSchema>[]> {
  try {
    const url = new URL("http://34.64.253.26:8080/api/admin/conversations");
    url.searchParams.append("participant_id", participantId);
    url.searchParams.append("access_key", accessKey);

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const parsed = conversationsResponseSchema.parse(data);
    return parsed.conversation_sessions;

  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    return [];
  }
}
