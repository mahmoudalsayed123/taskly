import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="md:fixed md:top-0 md:left-0 px-6 flex items-center gap-2 h-[80px] w-full">
      <Image src="/assets/logo.png" alt="Logo" width={18} height={20} />
      <h1 className="title-logo">Taskly</h1>
    </div>
  );
};

export default Logo;
