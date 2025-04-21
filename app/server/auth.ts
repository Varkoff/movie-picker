'use server';
import { prisma } from '@/app/server/db';
import { compare, hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setUserId } from './session';

const RegisterOrLoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Please enter a valid email address',
    })
    .email('Please enter a valid email address'),
  password: z
    .string({
      invalid_type_error: 'Password must be at least 6 characters',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export async function login(prevState: unknown, formData: FormData) {
  const formEmail = formData.get('email') as string;
  const formPassword = formData.get('password') as string;
  const validatedFields = RegisterOrLoginSchema.safeParse({
    email: formEmail,
    password: formPassword,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formEmail,
      password: formPassword,
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return {
      errors: {
        email: ['User not found'],
      },
      email: formEmail,
      password: formPassword,
    };
    // throw new Error('User not found');
  }

  const isPasswordValid = await comparePassword({
    password,
    hashedPassword: existingUser.password,
  });
  if (!isPasswordValid) {
    return {
      errors: {
        password: ['Invalid password'],
      },
      email: formEmail,
      password: formPassword,
    };
    // throw new Error('Invalid password');
  }
  await setUserId({ userId: existingUser.id });
  redirect('/');

  // return { email: existingUser.email, id: existingUser.id };
}

export async function register(prevState: unknown, formData: FormData) {
  const formEmail = formData.get('email') as string;
  const formPassword = formData.get('password') as string;
  const validatedFields = RegisterOrLoginSchema.safeParse({
    email: formEmail,
    password: formPassword,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formEmail,
      password: formPassword,
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ['User already exists'],
      },
      email: formEmail,
      password: formPassword,
    };
  }

  const hashedPassword = await hashPassword({ password });
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  await setUserId({ userId: user.id });
  redirect('/');
}

async function comparePassword({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) {
  return await compare(password, hashedPassword);
}

export async function hashPassword({ password }: { password: string }) {
  return await hash(password, 10);
}
