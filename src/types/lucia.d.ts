import { lucia } from "@/lib/auth";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      pseudo: string;
      email: string;
    };
  }
}
