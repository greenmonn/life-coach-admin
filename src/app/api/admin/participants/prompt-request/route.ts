import { NextResponse } from "next/server";

import { buildAdminApiHeaders, buildLifeCoachAdminApiUrl } from "@/lib/lifecoach-api";

export async function POST(request: Request) {
  const body = await request.json();
  const url = buildLifeCoachAdminApiUrl("participants/prompt-request");

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      ...buildAdminApiHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, { status: response.status });
}
