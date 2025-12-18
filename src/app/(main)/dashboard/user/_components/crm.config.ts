/* eslint-disable max-lines */

import z from "zod";

import { conversationSchema, conversationsResponseSchema,userSchema, userResponseSchema } from "./schema";

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

export async function fetchUser(participantId: string, accessKey: string): Promise<z.infer<typeof userSchema>> {
  try {
    const url = new URL("http://34.64.253.26:8080/api/admin/participantInfo");
    url.searchParams.append("participant_id", participantId);
    url.searchParams.append("access_key", accessKey);

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const parsed = userResponseSchema.parse(data);
    return parsed.participant_info;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return {
      id: "",
      access_key: "",
      group: "",
      total_completed_sessions: 0,
      last_conversation_time: null,
      is_active: false,
      initial_survey_answers: {
        'A1': '',
        'A2': ''
      },
      clinical_note: '',
      read_themes: [],
      conversation_uuid: null,
    }
  }
}