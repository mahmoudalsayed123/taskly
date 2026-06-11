'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import LogoDashboard from '@/components/LogoDashboard';
import { NavList } from '@/app/_constant';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SidebarMobile() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();
  const projectId = pathName.split('/')[2];
  const lastPathSegment = pathName.split('/').pop();
  const checkPath = pathName.includes('/invite');
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/burger.svg"
          alt="burger"
          width={20}
          height={20}
          className="cursor-pointer md:hidden"
          onClick={() => setIsOpen((e) => !e)}
        />
      </SheetTrigger>
      <SheetContent
        className={`"md:hidden w-[230px]!" ${checkPath ? 'hidden md:hidden' : ''}`}
      >
        <aside className=" h-screen p-4 bg-resend-container">
          {/*logo*/}
          <LogoDashboard />
          {/* Navigation List + (Collapse + Logout) */}
          <div className="flex flex-col justify-between pb-[60px] w-full h-full ">
            {/*Navigation List*/}
            <ul className="flex flex-col gap-1 ">
              {pathName.includes('/epics') ||
              pathName.includes('/members') ||
              pathName.includes('/tasks') ? (
                NavList.map((item) => (
                  <Link
                    href={`${item.name === 'projects' ? '/project' : `/project/${projectId}/${item.name}`} `}
                    key={item.id}
                    className={`${lastPathSegment === item.name ? 'bg-white' : ''} flex items-center gap-3 rounded-sm py-2.5 px-3 cursor-pointer`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                    />
                    <span className={` text-body font-medium text-slate-dark`}>
                      {item.name === 'projects'
                        ? 'Projects'
                        : `Project ${
                            item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)
                          }`}
                    </span>
                  </Link>
                ))
              ) : (
                <Link
                  href="/project"
                  className={`${pathName === '/project' ? 'bg-white' : ''} min-w-[179px] flex items-center gap-3 rounded-sm py-2.5 px-3 cursor-pointer`}
                >
                  <Image
                    src="/assets/icons/project.svg"
                    alt="project"
                    width={20}
                    height={20}
                  />
                  <span className={` text-body font-medium text-slate-dark`}>
                    Projects
                  </span>
                </Link>
              )}
            </ul>
            {/* Collapse + Logout */}
            <div className="flex flex-col items-start gap-3">
              <button className="hidden md:flex items-center gap-3 cursor-pointer">
                <Image
                  src="/assets/icons/collapse.svg"
                  alt="collapse"
                  width={8}
                  height={8}
                />
                <span className={` text-body font-medium text-slate-dark`}>
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
                <span className={`text-body font-medium text-error `}>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
