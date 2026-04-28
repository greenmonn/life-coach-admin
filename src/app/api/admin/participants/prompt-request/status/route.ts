import { NextResponse } from "next/server";

import { buildAdminApiHeaders, buildLifeCoachAdminApiUrl } from "@/lib/lifecoach-api";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const participantId = requestUrl.searchParams.get("participant_id");
  const accessKey = requestUrl.searchParams.get("access_key");

  if (!participantId || !accessKey) {
    return NextResponse.json({ message: "participant_id and access_key are required." }, { status: 400 });
  }

  const url = buildLifeCoachAdminApiUrl("participants/prompt-request/status");
  url.searchParams.set("participant_id", participantId);
  url.searchParams.set("access_key", accessKey);

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: buildAdminApiHeaders(),
  });

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, { status: response.status });
}
