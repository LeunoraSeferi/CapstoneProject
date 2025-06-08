import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

function DashboardHeader() {
  return (
    <div className="p-5 shadow-md flex justify-between items-center px-5">
      {/* Logo dhe titulli */}
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">SmartSteps</h2>
      </div>

      {/* Butoni i përdoruesit */}
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
