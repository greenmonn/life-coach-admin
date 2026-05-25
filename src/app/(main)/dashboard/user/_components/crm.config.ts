import z from "zod";

import { buildAdminApiHeaders, buildLifeCoachAdminApiUrl } from "@/lib/lifecoach-api";

import { participantsResponseSchema } from "../../default/_components/schema";

import { conversationSchema, conversationsResponseSchema, userSchema, userResponseSchema } from "./schema";

export async function fetchConversations(
  participantId: string,
  accessKey: string,
): Promise<z.infer<typeof conversationSchema>[]> {
  try {
    const url = buildLifeCoachAdminApiUrl("conversations");
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
    const participantInfoUrl = buildLifeCoachAdminApiUrl("participantInfo");
    participantInfoUrl.searchParams.append("participant_id", participantId);
    participantInfoUrl.searchParams.append("access_key", accessKey);

    const participantsUrl = buildLifeCoachAdminApiUrl("participants");
    participantsUrl.searchParams.set("type", "all");
    participantsUrl.searchParams.set("include_access_key", "true");

    const [participantInfoResponse, participantsResponse] = await Promise.all([
      fetch(participantInfoUrl.toString(), {
        cache: "no-store",
      }),
      fetch(participantsUrl.toString(), {
        cache: "no-store",
        headers: buildAdminApiHeaders(),
      }),
    ]);

    if (!participantInfoResponse.ok) {
      throw new Error(`HTTP error! status: ${participantInfoResponse.status}`);
    }

    if (!participantsResponse.ok) {
      throw new Error(`HTTP error! status: ${participantsResponse.status}`);
    }

    const participantInfoData = await participantInfoResponse.json();
    const participantsData = await participantsResponse.json();
    const parsedUser = userResponseSchema.parse(participantInfoData);
    const parsedParticipants = participantsResponseSchema.parse(participantsData);
    const matchedParticipant =
      parsedParticipants.participants.find(
        (participant) => participant.id === participantId && participant.access_key === accessKey,
      ) ?? parsedParticipants.participants.find((participant) => participant.id === participantId);

    return {
      ...parsedUser.participant_info,
      enrolled_date: matchedParticipant?.enrolled_date ?? null,
    };
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return {
      id: "",
      access_key: "",
      group: "",
      enrolled_date: null,
      total_completed_sessions: 0,
      last_conversation_time: null,
      is_active: false,
      initial_survey_answers: {
        A1: "",
        A2: "",
      },
      clinical_note: "",
      read_themes: [],
      conversation_uuid: null,
    };
  }
}
