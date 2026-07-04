'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const FormSignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    // Validation

    if (formData.name.length < 3 || formData.name.length > 50) {
      toast.error('Name must be between 3 and 50 characters.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Invalid email address.');
      return;
    }

    if (formData.jobTitle.length > 50) {
      toast.error('Job title must be less than 50 characters.');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const resSignUp = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          jobTitle: formData.jobTitle,
          password: formData.password,
        }),
      });

      const data = await resSignUp.json();

      if (!resSignUp.ok) {
        toast.error(data.error || 'Something went wrong');
        return;
      }
      // reset form
      setFormData({
        name: '',
        email: '',
        jobTitle: '',
        password: '',
        confirmPassword: '',
      });

      handleRedirectToLogin();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  const handleRedirectToLogin = () => {
    const redirect = searchParams.get('redirect');
    router.push(
      `/login?redirect=${encodeURIComponent(redirect || '/project')}`,
    );
  };

  return (
    <>
      <div className="w-full flex flex-col gap-11 pb-4">
        {/* Name */}
        <div className="relative flex flex-col items-center">
          <label className="label" htmlFor="name">
            Full Name
          </label>

          <input
            className="input-mobile"
            type="text"
            placeholder="Enter Your Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <p className="text-label text-slate-light w-full p-1">
            3-50 characters, letters only.
          </p>
        </div>

        {/* Email */}
        <div className="relative flex flex-col items-center">
          <label className="label" htmlFor="email">
            Email
          </label>

          <input
            className="input-mobile"
            type="email"
            placeholder="yourname@company.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Job Title */}
        <div className="relative flex flex-col items-center">
          <label className="label" htmlFor="jobTitle">
            Job Title <span>(optional)</span>
          </label>

          <input
            className="input-mobile"
            type="text"
            placeholder="e.g. Page Manager"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>

        {/* Passwords */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-4">
          <div className="relative flex flex-col items-center">
            <label className="label" htmlFor="password">
              Password
            </label>

            <input
              className="input-mobile"
              type="password"
              placeholder="Min. 8 characters"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="relative flex flex-col items-center">
            <label className="label" htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              className="input-mobile"
              type="password"
              placeholder="Repeat your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          className="btn-primary h-[56px] text-[16px] font-semibold cursor-pointer shadow-[0px_1px_2px_0px_#0000000D]"
          type="button"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </div>
      {/* Footer */}
      <div className="px-8 py-[47.5px] md:w-full md:px-0 md:pt-8 md:pb-0">
        <p className="text-center text-body font-semibold text-slate-medium">
          Already have an account?{' '}
          <button
            type="button"
            onClick={handleRedirectToLogin}
            className="text-primary text-body"
          >
            Log in
          </button>
        </p>
      </div>
    </>
  );
};

export default FormSignUp;
