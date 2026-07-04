'use client';
import { DialogClose } from '@/components/ui/dialog';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

const BtnInviteMember = ({ projectId }: { projectId?: string }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleInvite() {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, projectId }),
      });
      const data = await res.json();
      if (data.message) {
        toast.success(data.message);
      }
      if (data.error) {
        setError(data.error);
      }
      if (!res.ok) {
        setError(data.error);
      }
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
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
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full flex flex-col md:flex-row-reverse justify-center md:justify-between mt-5  items-center gap-3">
        {email && !error ? (
          <DialogClose asChild>
            <button
              className="w-full! md:w-[150px]! md:h-[45px]! rounded-[2px]! btn-primary text-body font-semibold cursor-pointer shadow-[0px_4px_6px_-4px_#0000001A]"
              type="button"
              onClick={handleInvite}
            >
              {loading ? (
                <div className="w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-0 border-white flex items-center justify-center"></div>
                </div>
              ) : (
                'Add Members'
              )}
            </button>
          </DialogClose>
        ) : (
          <button
            className="w-full! md:w-[150px]! md:h-[45px]! rounded-[2px]! btn-primary text-body font-semibold cursor-pointer shadow-[0px_4px_6px_-4px_#0000001A]"
            type="button"
            onClick={handleInvite}
            // disabled={!email || !!error}
          >
            {loading ? (
              <div className="w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-0 border-white flex items-center justify-center"></div>
              </div>
            ) : (
              'Add Members'
            )}
          </button>
        )}
        <DialogClose asChild>
          <button className="text-body font-semibold text-primary-container cursor-pointer md:ps-10">
            Cancel
          </button>
        </DialogClose>
      </div>
    </>
  );
};

export default BtnInviteMember;
