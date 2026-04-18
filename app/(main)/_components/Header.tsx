import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed w-full h-[64px] border-b border-b-black px-6 py-3">
      <div className="absolute top-1.5 right-[225px] flex items-center gap-4">
        <div className="">
          <h2 className="text-body font-semibold text-slate-dark">
            Mahmoud Sayed
          </h2>
          <p className="text-label font-bold text-primary">Project Maneger</p>
        </div>
        {/*<button*/}
        {/*  className="w-10 h-10 bg-primary font-bold rounded-lg text-white"*/}
        {/*  disabled*/}
        {/*>*/}
        {/*  MS*/}
        {/*</button>*/}
        <Image
          src="/assets/mahmoud-ai.jpg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-lg"
        />
      </div>
    </header>
  );
};
export default Header;
