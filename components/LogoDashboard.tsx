import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Image src="/assets/logo.png" alt="Logo" width={18} height={20} />
      <h1 className="title-logo">Taskly</h1>
    </div>
  );
};

export default Logo;
