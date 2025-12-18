import z from "zod";

export const conversationSchema = z.object({
  id: z.string(),
  session_index: z.number(),
  participant_id: z.string(),
  status: z.string(),
  theme: z.string(),
  message_count: z.number(),
  start_time: z.string(),
  end_time: z.string().nullable(),
  last_activity: z.string(),
  conversation_uuid: z.string(),
});

export const conversationsResponseSchema = z.object({
  conversation_sessions: z.array(conversationSchema),
});

export const userSchema = z.object({
  id: z.string(),
  access_key: z.string(),
  group: z.string(),
  total_completed_sessions: z.number(),
  last_conversation_time: z.string().nullable(),
  is_active: z.boolean(),
  initial_survey_answers: z.object({
    'A1': z.string(),
    'A2': z.string()
  }),
  clinical_note: z.string(),
  read_themes: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      total_pages: z.number(),
      pages_read: z.number(),
    })
  ),
  conversation_uuid: z.string().nullable(),
});

export const userResponseSchema = z.object({
  participant_info: userSchema,
});
