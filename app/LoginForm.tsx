'use client';
import { useActionState, useEffect, useRef } from 'react';
import { login } from './server/auth';
export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {
    errors: {
      email: undefined,
      password: undefined,
    },
    email: '',
    password: '',
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.errors?.email) {
      emailRef.current?.focus();
    } else if (state?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [state?.errors]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                defaultValue={state?.email}
                autoComplete="email"
                required
                className={`mt-1 block w-full rounded-md border ${state?.errors?.email ? 'border-red-500!' : 'border-gray-300 dark:border-gray-700'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
              />
              {state?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">{state.errors.email.join(', ')}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                defaultValue={state?.password}
                autoComplete="current-password"
                required
                className={`mt-1 block w-full rounded-md border ${state?.errors?.password ? 'border-red-500!' : 'border-gray-300 dark:border-gray-700'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
              />
              {state?.errors?.password && (
                <p className="mt-1 text-sm text-red-600">{state.errors.password.join(', ')}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={pending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {pending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
