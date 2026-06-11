'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const FormLogin = ({ token }: { token: string | null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // redirect path
  const redirect = searchParams.get('redirect');
  useEffect(() => {
    async function handleCheckMember() {
      // الحالة الأولى
      if (redirect && token && redirect.startsWith('/invite')) {
        const url = new URL(redirect, window.location.origin);

        const inviteToken = url.searchParams.get('token');

        if (inviteToken) {
          const decoded = jwtDecode(inviteToken) as {
            projectId: string;
          };

          const res = await fetch('/api/project/check-member', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              projectId: decoded.projectId,
            }),
          });

          const data = await res.json();

          // لو member بالفعل
          if (data.isMember) {
            router.push(`/project/${decoded.projectId}/epics`);
            return;
          }

          // لو مش member
          router.push(`/invite?token=${inviteToken}`);
          return;
        }
      } else if (redirect && !token) {
        toast.error('You need to login to access this page');
      } else if (!redirect && !token) {
        // الحالة الثانية
        toast.error('You need to login to access this page');
        router.push('/login');
      }
    }
    handleCheckMember();
  }, []);

  async function handleSubmit() {
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
      alert(data.error);
      return;
    }
    router.push('/project');
  }
  return (
    <>
      <div className="w-full  flex flex-col gap-11 pb-4">
        {/* email */}
        <div className="relative flex flex-col items-center ">
          <label className="label" htmlFor="email">
            Email Address
          </label>
          <div className="relative w-full ">
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
              className="absolute top-[50%] translate-y-[-50%] right-3"
            />
          </div>
        </div>
        {/* password */}
        <div className=" flex flex-col items-center ">
          <div className=" relative w-full flex justify-between">
            <label
              className="w-full  text-label font-bold uppercase text-slate-medium mb-[4px]"
              htmlFor="password"
            >
              Password
            </label>
          </div>
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
              className="absolute top-[50%] translate-y-[-50%] right-3"
            />
          </div>
        </div>
      </div>

      {/* sign in button */}
      <button
        className="w-full btn-primary h-[56px] text-[16px] font-semibold cursor-pointer  shadow-[0px_1px_2px_0px_#0000000D]"
        type="submit"
        onClick={handleSubmit}
      >
        Sign In
      </button>
      <div className="px-8 py-[47.5px] md:w-full md:px-0 md:pt-8 md:pb-0">
        <p className="text-center text-body font-semibold text-slate-medium">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary text-body">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};
export default FormLogin;
