'use client';
import React from 'react';

import LogoDashboard from '@/components/LogoDashboard';
import { NavList } from '@/app/_constant';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  console.log(isCollapsed);

  return (
    <>
      <aside className="md:fixed md:col-span-1 absolute top-0 left-0 z-50 w-[230px] h-screen p-4 bg-resend-container">
        {/*logo*/}
        <LogoDashboard />
        {/* Navigation List + (Collapse + Logout) */}
        <div className="flex flex-col justify-between pb-[60px] w-full h-full ">
          {/*Navigation List*/}
          <ul className="flex flex-col gap-1 ">
            {NavList.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className="flex items-center gap-3 rounded-sm py-2.5 px-3 bg-white cursor-pointer"
              >
                <Image src={item.icon} alt={item.name} width={20} height={20} />
                <span
                  className={`${isCollapsed ? 'hidden' : 'block'} text-body font-medium text-slate-dark`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </ul>
          {/* Collapse + Logout */}
          <div className="flex flex-col items-start gap-3">
            <button
              onClick={() => setIsCollapsed((e) => !e)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Image
                src="/assets/icons/collapse.svg"
                alt="collapse"
                width={8}
                height={8}
              />
              <span
                className={`${isCollapsed ? 'hidden' : 'block'} text-body font-medium text-slate-dark`}
              >
                Collapse
              </span>
            </button>
            <button className="flex items-center gap-3 cursor-pointer">
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={15}
                height={15}
              />
              <span
                className={`${isCollapsed ? 'hidden' : 'block'} text-body font-medium text-error `}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/*  Sidebar mobile */}
      {/*<aside className=" bg-resend-container absolute top-0 left-0 w-[288px] max:h-screen z-50 md:hidden">*/}
      {/*  /!*logo*!/*/}
      {/*  <LogoDashboard />*/}
      {/*</aside>*/}
    </>
  );
};
export default Sidebar;
