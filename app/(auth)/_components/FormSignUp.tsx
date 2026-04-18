'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const FormSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    password: '',
    confirmPassword: '',
  });
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputJobTitle = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputConfirmPassword = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    if (formData.name.length < 3 || formData.name.length > 50) {
      alert('Name must be between 3 and 50 characters.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Invalid email address.');
      return;
    }

    if (formData.jobTitle.length > 50) {
      alert('Job title must be less than 50 characters.');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      alert('Passwords do not match.');
      return;
    }
    if (!formData.email) return;

    // const resCheckEmail = await fetch("/api/auth/check-email", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email: formData.email }),
    // });
    //
    // try {
    //   const dataCheckEmail = await resCheckEmail.json();
    //   if (dataCheckEmail.exists) {
    //     alert("Email already exists.");
    //     router.push("/login");
    //   }
    // } catch (e) {
    //   console.error(e);
    // }

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

    try {
      const dataSignUp = await resSignUp.json();
      console.log(dataSignUp);
      if (dataSignUp) {
        router.push('/login');
      }
    } catch (e) {
      console.error(e);
    }

    if (resSignUp) {
      if (inputName.current) {
        inputName.current.value = '';
      }
      if (inputEmail.current) {
        inputEmail.current.value = '';
      }
      if (inputJobTitle.current) {
        inputJobTitle.current.value = '';
      }
      if (inputPassword.current) {
        inputPassword.current.value = '';
      }
      if (inputConfirmPassword.current) {
        inputConfirmPassword.current.value = '';
      }
      router.push('/login');
    }
  }
  return (
    <div className="w-full  flex flex-col gap-11 pb-4">
      <div className="relative flex flex-col items-center ">
        <label className="label" htmlFor="name">
          Full Name
        </label>
        <input
          className="input-mobile"
          type="text"
          placeholder="Enter Your Full Name"
          name="name"
          onChange={handleChange}
          ref={inputName}
        />
        <p className="text-label text-slate-light w-full p-1">
          3-50 characters, letters only.
        </p>
      </div>
      <div className="relative flex flex-col items-center ">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input-mobile"
          type="email"
          placeholder="yourname@company.com"
          name="email"
          onChange={handleChange}
          ref={inputEmail}
        />
      </div>
      <div className="relative flex flex-col items-center ">
        <label className="label" htmlFor="jobTitle">
          Job Title <span> (optional)</span>
        </label>
        <input
          className="input-mobile"
          type="text"
          placeholder="e.g. Page Manager"
          name="jobTitle"
          onChange={handleChange}
          ref={inputJobTitle}
        />
      </div>
      <div className="flex flex-col gap-10 md:flex md:flex-row md:gap-4">
        <div className="relative flex flex-col items-center ">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input-mobile"
            type="password"
            placeholder="Min. 8 characters"
            name="password"
            onChange={handleChange}
            ref={inputPassword}
          />
        </div>
        <div className="relative flex flex-col items-center ">
          <label className="label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="input-mobile"
            type="password"
            placeholder="Repeat your password"
            name="confirmPassword"
            onChange={handleChange}
            ref={inputConfirmPassword}
          />
        </div>
      </div>
      <button
        className="btn-primary h-[56px] text-[16px] font-semibold cursor-pointer  shadow-[0px_1px_2px_0px_#0000000D]"
        type="submit"
        onClick={handleSubmit}
      >
        Create Account
      </button>
    </div>
  );
};

export default FormSignUp;
