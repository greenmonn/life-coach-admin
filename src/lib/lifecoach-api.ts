export const LIFECOACH_API_HOST = process.env.LIFECOACH_API_HOST ?? "http://34.64.253.26:8080";
export const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export function buildLifeCoachAdminApiUrl(path: string) {
  return new URL(`/api/admin/${path}`, LIFECOACH_API_HOST);
}

export function buildAdminApiHeaders() {
  if (!ADMIN_API_KEY) {
    throw new Error("ADMIN_API_KEY is required for admin API requests.");
  }

  return {
    "X-Admin-Key": ADMIN_API_KEY,
  };
}
