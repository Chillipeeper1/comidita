import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

// Llamar al inicio de cada server action del panel: son endpoints públicos.
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("No autorizado");
}
