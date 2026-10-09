'use server';

import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  safeEqual,
} from '@/lib/auth';

export async function login(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword || !process.env.ADMIN_SESSION_SECRET) {
    console.error('Faltan ADMIN_EMAIL, ADMIN_PASSWORD o ADMIN_SESSION_SECRET');
    return { success: false, error: 'El acceso de administrador no está configurado.' };
  }

  const valid =
    safeEqual(String(email).trim().toLowerCase(), adminEmail.trim().toLowerCase()) &&
    safeEqual(String(password), adminPassword);
  if (!valid) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: false, error: 'Credenciales incorrectas.' };
  }

  const token = await createSessionToken();
  if (!token) return { success: false, error: 'No se pudo iniciar sesión.' };

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return { success: true };
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
}
