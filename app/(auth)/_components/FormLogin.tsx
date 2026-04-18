'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FormLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit() {
    try {
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

      if (!res.ok) throw new Error('Failed to login');
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log('message Error', e);
    }
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
            <Link
              href="/forgot-password"
              className="text-label text-primary font-semibold"
            >
              Forgot?
            </Link>
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
