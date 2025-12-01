/* eslint-disable max-lines */

import z from "zod";

import { apiResponseSchema, themeSchema } from "./schema";

export async function fetchThemes(): Promise<z.infer<typeof themeSchema>[]> {
  try {
    const response = await fetch("http://34.64.253.26:8080/api/admin/themes_all", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const validatedData = apiResponseSchema.parse(data);

    return validatedData.themes.map((theme) => ({
      id: theme.theme_id,
      title: theme.theme_title,
      category: theme.category,
      chunk_count: theme.num_chunks,
      suggest_count: theme.num_recommended,
      read_count: theme.num_read,
    }));
  } catch (error) {
    console.error("Failed to fetch themes:", error);
    return [];
  }
}
