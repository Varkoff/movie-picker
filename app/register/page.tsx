'use server';

import { redirect } from 'next/navigation';
import { RegisterForm } from '../RegisterForm';
import { getOptionalUser } from '../server/session';

export default async function Register() {
  const user = await getOptionalUser();
  if (user) {
    return redirect('/');
  }
  return <RegisterForm />;
}
