import { z } from "zod";

export const participantSchema = z
  .object({
    id: z.string(),
    access_count: z.number(),
    session_count: z.number(),
    is_active: z.boolean().optional(),
    recent_activity: z.string().nullable(),
    days_after_last_activity: z.number().nullable(),
    enrolled_date: z.string().nullable().optional(),
    access_expires_at: z.string().nullable().optional(),
    access_expired: z.boolean().optional(),
    access_key: z
      .string()
      .nullish()
      .transform((value) => value ?? ""),
  })
  .transform((participant) => ({
    ...participant,
    is_active:
      participant.is_active ??
      (participant.days_after_last_activity !== null && participant.days_after_last_activity <= 7),
    enrolled_date: participant.enrolled_date ?? null,
    access_expires_at: participant.access_expires_at ?? null,
    access_expired: participant.access_expired ?? false,
  }));

export const participantsResponseSchema = z.object({
  participants: z.array(participantSchema),
});
