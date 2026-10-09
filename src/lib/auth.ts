// Sesión de admin: cookie httpOnly con expiración firmada (HMAC-SHA256).
// Usa Web Crypto para funcionar tanto en el middleware (edge) como en Node.
export const SESSION_COOKIE = "comidita_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

const encoder = new TextEncoder();

async function sign(payload: string): Promise<string | null> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string | null> {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE);
  const signature = await sign(exp);
  return signature ? `${exp}.${signature}` : null;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [exp, signature] = token.split(".");
  if (!exp || !signature || Number(exp) < Date.now() / 1000) return false;
  const expected = await sign(exp);
  return expected !== null && safeEqual(signature, expected);
}
