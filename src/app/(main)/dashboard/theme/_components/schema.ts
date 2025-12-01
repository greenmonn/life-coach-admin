import z from "zod";

export const themeSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  chunk_count: z.number(),
  suggest_count: z.number(),
  read_count: z.number(),
});

export const apiThemeSchema = z.object({
  theme_id: z.string(),
  theme_title: z.string(),
  category: z.string(),
  num_chunks: z.number(),
  num_recommended: z.number(),
  num_read: z.number(),
  intro: z.string(),
  chunks: z.array(z.string()),
});

export const apiResponseSchema = z.object({
  themes: z.array(apiThemeSchema),
});
