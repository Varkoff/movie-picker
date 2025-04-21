'use server';
import { cookies } from 'next/headers';
import { prisma } from './db';

const sessionCookieName = 'user_session';

export async function getUserId() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(sessionCookieName);
  if (!sessionCookie) {
    return null;
  }
  return sessionCookie.value;
}

export async function setUserId({ userId }: { userId: string }) {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, userId, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function getOptionalUser() {
  const userId = await getUserId();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
    },
  });
  return user;
}

export async function requireUser() {
  const user = await getOptionalUser();
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
