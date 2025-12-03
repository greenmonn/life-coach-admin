import { z } from "zod";

export const participantSchema = z.object({
  id: z.string(),
  access_count: z.number(),
  session_count: z.number(),
  recent_activity: z.string().nullable(),
  days_after_last_activity: z.number().nullable(),
  access_key: z.string(),
});

export const participantsResponseSchema = z.object({
  participants: z.array(participantSchema),
});
