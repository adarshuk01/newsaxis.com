import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const Layout = () => {
  return (
    <div className="flex flex-col  min-h-screen">
      {/* Navbar */}
      <header className=" text-white sticky -top-16 z-40">
       <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow space-y-4">
        <div className="container px-4 mx-auto lg:px-20  ">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600">
        <div className="container mx-auto p-4 text-center">
          <p>© 2024 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
