import { NextResponse } from "next/server";

import { ADMIN_AUTH_COOKIE, ADMIN_AUTH_SESSION_VALUE } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_API_KEY;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ message: "Admin login is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_AUTH_COOKIE, ADMIN_AUTH_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
