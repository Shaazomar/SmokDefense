export const ADMIN_COOKIE_NAME = "sd_admin_session";
const SESSION_SECRET = "smokedefense_super_secret_session_token_2026";

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function generateSessionToken(userId: string): string {
  const sig = simpleHash(`${userId}:${SESSION_SECRET}`);
  return `${userId}:${sig}`;
}

export function parseSessionToken(token: string): string | null {
  if (!token) return null;
  const parts = token.split(":");
  if (parts.length !== 2) return null;
  const [userId, sig] = parts;
  const expectedSig = simpleHash(`${userId}:${SESSION_SECRET}`);
  if (sig === expectedSig) return userId;
  return null;
}
