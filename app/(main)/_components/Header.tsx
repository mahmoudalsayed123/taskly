'use client';

import Image from 'next/image';

import SidebarMobile from '@/app/(main)/_components/SidebarMobile';
import { User } from '@/app/generated/prisma/browser';
import { usePathname } from 'next/navigation';

const Header = ({ user }: { user: User }) => {
  const pathName = usePathname();
  const chickPath = pathName.includes('/invite');

  if (!user) {
    return;
  }
  return (
    <>
      <header
        className={`fixed z-50 flex justify-between items-center md:ms-[198px] w-full h-[64px] border-b border-b-black px-6 py-3 bg-[#f9f9ff] ${chickPath ? 'hidden' : ''}`}
      >
        <div className="flex items-center gap-4">
          <SidebarMobile />
          <h1 className="text-[20px] font-bold md:hidden">Taskly</h1>
        </div>
        <div className="md:absolute md:top-1.5 md:right-[225px] flex items-center gap-4">
          <div className="hidden md:block">
            <h2 className="text-body font-semibold text-slate-dark">
              {user?.name}
            </h2>
            <p className="text-label font-bold text-primary">
              {user?.jobTitle}
            </p>
          </div>
          <button className="w-10 h-10 bg-primary font-bold rounded-lg text-white">
            {user?.name.slice(0, 2).toUpperCase()}
          </button>
          {/* {user.image ? (
            <Image
              src={user.image}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-lg"
            />
          ) : (
            <button className="w-10 h-10 bg-primary font-bold rounded-lg text-white">
              {user.name.slice(0, 2).toUpperCase()}
            </button>
          )} */}
        </div>
      </header>
    </>
  );
};
export default Header;
