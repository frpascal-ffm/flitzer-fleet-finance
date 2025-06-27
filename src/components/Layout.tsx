import React from 'react';
import Sidebar from './Sidebar';
import { SignedIn, UserButton } from "@clerk/clerk-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-end items-center">
          <SignedIn>
            <UserButton afterSignOutUrl="/login" />
          </SignedIn>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
