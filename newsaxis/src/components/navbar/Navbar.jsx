import React, { useState, useEffect, useRef } from "react";
import { Edit, Bell, AlignJustify } from "lucide-react";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md relative mb-10">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          {/* Hamburger Menu (visible on small screens) */}
          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleMenu} className="text-gray-800">
              <AlignJustify />
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Logo Title */}
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-400 drop-shadow-lg">
              NewsAxis
            </h1>
            {/* Subtitle */}
            <span className="text-sm font-serif -mt-2 text-gray-600 tracking-tighter">
              ALL IN ONE
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <NavLinks isMenuOpen={isMenuOpen} />
        </div>

        {/* Write Button and Other Icons */}
        <div className="flex items-center space-x-4 relative">
          {/* Dropdown Container */}
          <div ref={dropdownRef} className={`absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md p-4 ${isDropdownOpen ? 'block' : 'hidden'}`}>
            <button className="w-full bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md flex items-center justify-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Subscribe</span>
            </button>
          </div>

          {/* Notifications Icon */}
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-800 hover:text-red-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
          </div>

          {/* Profile Icon */}
          <div className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden" onClick={toggleDropdown}>
            <img
              src="https://i.pravatar.cc/300"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
