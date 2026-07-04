'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

const FormLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const redirect = searchParams.get('redirect');

  async function handleSubmit() {
    try {
      setLoading(true);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || data.message);
        return;
      }
      toast.success('Login successful');

      if (res.status === 404) {
        router.push(
          `/signup?redirect=${encodeURIComponent(redirect || '/project')}`,
        );
      }
      router.replace(redirect || '/project');
      router.refresh();
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-11 pb-4">
        {/* Email */}
        <div className="relative flex flex-col items-center">
          <label className="label" htmlFor="email">
            Email Address
          </label>

          <div className="relative w-full">
            <input
              className="input-mobile"
              type="email"
              placeholder="curator@workspace.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Image
              src="/assets/icons/email.svg"
              alt="email"
              width={15}
              height={15}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col items-center">
          <label
            className="text-label font-bold uppercase text-slate-medium mb-1 w-full"
            htmlFor="password"
          >
            Password
          </label>

          <div className="relative w-full">
            <input
              className="input-mobile"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Image
              src="/assets/icons/lock.svg"
              alt="lock"
              width={12}
              height={12}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <button
        className="w-full btn-primary h-[56px] text-[16px] font-semibold disabled:opacity-50"
        type="button"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      <div className="px-8 py-[47.5px] md:w-full md:px-0 md:pt-8 md:pb-0">
        <p className="text-center text-body font-semibold text-slate-medium">
          Don't have an account?{' '}
          <Link
            href={`/signup?redirect=${encodeURIComponent(redirect || '/project')}`}
            className="text-primary cursor-pointer text-body"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default FormLogin;
