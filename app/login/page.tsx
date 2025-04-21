'use server';

import { redirect } from 'next/navigation';
import { LoginForm } from '../LoginForm';
import { getOptionalUser } from '../server/session';

export default async function Login() {
  const user = await getOptionalUser();
  if (user) {
    redirect('/');
  }

  return <LoginForm />;
}
