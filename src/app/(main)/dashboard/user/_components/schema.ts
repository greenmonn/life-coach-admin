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
});

export const conversationsResponseSchema = z.object({
  conversation_sessions: z.array(conversationSchema),
});
