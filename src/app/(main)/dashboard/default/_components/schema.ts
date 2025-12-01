import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  access_count: z.number(),
  session_count: z.number(),
  recent_activity: z.string(),
  days_after_last_activity: z.number(),
});
