// lib/cookies/index.ts
import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "accessToken";

// get access token
export function getAccessToken() {
  return cookies().get(ACCESS_TOKEN_KEY)?.value || null;
}

// set access token
export function setAccessToken(token: string, expires?: number) {
  const expiration = expires
    ? new Date(expires)
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  cookies().set(ACCESS_TOKEN_KEY, token, {
    httpOnly: true,
    expires: expiration,
  });
}
