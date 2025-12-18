import z from "zod";

export const chatHistorySchema = z.object({
  id: z.string(),
  participantId: z.string(),
  sessionIndex: z.number(),
  name: z.string(),
  messageCount: z.number(),
  endTime: z.string().nullable(),
  messages: z.array(
    z.object({
      id: z.number(),
      sender: z.string(),
      content: z.string(),
      stage: z.string(),
      timestamp: z.string(),
    })
  ),
});

export const chatHistoriesResponseSchema = z.object({
  chat_history: z.array(chatHistorySchema),
});