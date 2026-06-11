'use client';
import React from 'react';
import { NavListMobile } from '@/app/_constant';
import Link from 'next/link';
import Image from 'next/image';

const NavigationBarMobile = () => {
  return (
    <nav className="md:hidden absolute bottom-0 left-0 w-full px-7 py-8 bg-resend-container">
      <ul className="flex items-center justify-center gap-10 ">
        {NavListMobile.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className="flex flex-col items-center justify-center gap-2 rounded-sm text-primary-container cursor-pointer"
          >
            <Image src={item.icon} alt={item.name} width={18} height={18} />
            <span className={` text-label font-semibold  `}>{item.name}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default NavigationBarMobile;
