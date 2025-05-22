"use server";

import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

export async function invalidateSession() {
  const cookieStore = await cookies();
  cookieStore.set(
    lucia.createBlankSessionCookie().name,
    lucia.createBlankSessionCookie().value,
    lucia.createBlankSessionCookie().attributes
  );
}
