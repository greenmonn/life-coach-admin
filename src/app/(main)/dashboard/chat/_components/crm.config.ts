/* eslint-disable max-lines */

import z from "zod";

import { chatHistorySchema, chatHistoriesResponseSchema } from "./schema";

export async function fetchConversations(participantId: string, accessKey: string, conversationUuid: string): Promise<z.infer<typeof chatHistorySchema>[]> {
  try {
    const url = new URL("http://34.64.253.26:8080/api/admin/chatHistory");
    url.searchParams.append("participant_id", participantId);
    url.searchParams.append("access_key", accessKey);
    url.searchParams.append("conversation_uuid", conversationUuid);

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const parsed = chatHistoriesResponseSchema.parse(data);
    return parsed.chat_history;

  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    return [{
      id: "N/A",
      participantId: participantId,
      sessionIndex: 0,
      name: "N/A",
      messageCount: 0,
      endTime: null,
      messages: [],
    }]
  };
}