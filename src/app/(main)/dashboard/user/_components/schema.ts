import z from "zod";

export const conversationSchema = z.object({
  id: z.string(),
  participant_id: z.string(),
  status: z.string(),
  theme: z.string(),
  message_count: z.number(),
  completed: z.boolean(),
  last_activity: z.string(),
});
