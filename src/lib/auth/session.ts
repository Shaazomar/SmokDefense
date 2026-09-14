import { cookies } from "next/headers";
import { db } from "@/lib/db/store";
import type { DbUser } from "@/lib/db/types";
import { ADMIN_COOKIE_NAME, generateSessionToken, parseSessionToken } from "./token";

export { ADMIN_COOKIE_NAME, generateSessionToken, parseSessionToken };

export async function getCurrentAdmin(): Promise<DbUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;

    const userId = parseSessionToken(token);
    if (!userId) return null;

    const user = db.getRawData().users.find((u) => u.id === userId);
    return user || null;
  } catch {
    return null;
  }
}

export async function createAdminSession(userId: string): Promise<void> {
  const token = generateSessionToken(userId);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
