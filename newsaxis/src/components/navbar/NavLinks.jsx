import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import { navigationData } from "../../datas/navData";

const NavLinks = ({ isMenuOpen }) => {
  const location = useLocation(); // Get current location from React Router
  const [activeLink, setActiveLink] = useState(location.pathname); // Track active link based on pathname
  const linkRefs = useRef([]); // Store refs for each link

  useEffect(() => {
    // Update the active link when the location changes
    setActiveLink(location.pathname);

    // Scroll to the active link when the location changes
    const activeIndex = navigationData.findIndex((link) => link.href === location.pathname);
    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      linkRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [location]);

  return (
    <div
      className={`lg:flex lg:flex-row ${
        isMenuOpen ? "flex" : "hidden"
      } lg:block absolute top-14 left-0 w-full bg-white mt-2 p-2 overflow-x-scroll`}
    >
      {navigationData.map((link, index) => (
        <a
          key={index}
          href={link.href}
          ref={(el) => (linkRefs.current[index] = el)} // Assign ref to each link
          className={`flex items-center text-gray-800 py-2 px-3 lg:px-4 ${
            activeLink === link.href
              ? "border-b-2 font border-red-600 text-red-600"
              : "border"
          } hover:text-red-600`}
        >
          <span className="mr-1">{link.icon}</span> {/* Render icon */}
          {link.text}
        </a>
      ))}
    </div>
  );
};

export default NavLinks;
