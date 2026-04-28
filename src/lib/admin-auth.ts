export const ADMIN_AUTH_COOKIE = "life_coach_admin_session";
export const ADMIN_AUTH_SESSION_VALUE = "authenticated";
export const ADMIN_LOGIN_PATH = "/auth/v1/login";
export const ADMIN_DEFAULT_AUTHENTICATED_PATH = "/dashboard/default";

export function isAdminSessionValid(value: string | undefined) {
  return value === ADMIN_AUTH_SESSION_VALUE;
}
