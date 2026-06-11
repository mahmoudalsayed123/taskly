'use client';
import Image from 'next/image';
import { useState } from 'react';

const BtnInviteMember = ({ projectId }: { projectId?: string }) => {
  const [email, setEmail] = useState('');

  async function handleInvite() {
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, projectId }),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="relative w-full ">
        {/* Email Addresses */}
        <label className="label" htmlFor="email">
          Email Addresses
        </label>
        <input
          className="input-mobile h-[45px]!"
          type="text"
          id="email"
          placeholder="Enter email addresses"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Image
          src="/assets/icons/email.svg"
          alt="add-email"
          width={16}
          height={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row-reverse justify-center md:justify-between mt-5  items-center gap-3">
        <button
          className="w-full! md:w-[150px]! md:h-[45px]! rounded-[2px]! btn-primary text-body font-semibold cursor-pointer shadow-[0px_4px_6px_-4px_#0000001A]"
          type="button"
          onClick={handleInvite}
        >
          Add Members
        </button>
        <p className="text-body font-semibold text-primary-container cursor-pointer md:ps-10">
          Cancel
        </p>
      </div>
    </>
  );
};

export default BtnInviteMember;
