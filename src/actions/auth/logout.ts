"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";

export default async function logout() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
  if (sessionCookie) {
    const { session } = await lucia.validateSession(sessionCookie);
    if (session) {
      await lucia.invalidateSession(session.id);
      cookieStore.delete(lucia.sessionCookieName);
    }
  }
  redirect("/auth");
}
