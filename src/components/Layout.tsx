import React from 'react';
import Sidebar from './Sidebar';
import { SignedIn, UserButton } from "@clerk/clerk-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen h-screen w-full overflow-hidden bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden max-w-full">
        <header className="bg-white shadow-sm px-4 py-2 flex justify-end items-center">
          <SignedIn>
            <UserButton afterSignOutUrl="/login" />
          </SignedIn>
        </header>
        <div className="flex-1 overflow-auto w-full max-w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
