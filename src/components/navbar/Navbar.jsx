import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { name: "Home", slug: "/PassLocker/" },
    { name: "PassGenerator", slug: "/PassLocker/passgenerator" },
  ];

  return (
    <>
      <nav className="flex justify-between px-4 lg:px-32 items-center fixed bg-sky-200 w-screen h-16">
        <div className="text-3xl font-semibold select-none cursor-pointer">
          <NavLink to="/PassLocker/" className={"flex items-center"}>
            PassLocker
            <img src="padlock.png" alt="Lock Image" className="h-8 ml-1" />
          </NavLink>
        </div>
        <div className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
          <img src="menu.png" alt="Menu Image" className="w-5" />
        </div>
        <div
          className={`sm:hidden ${
            showMenu
              ? "flex flex-col fixed top-16 right-0 w-4/12 rounded-b-md bg-sky-200 items-start gap-4"
              : "hidden"
          }`}
        >
          {navItems.map((item) => (
            <div key={item.slug} className="w-full">
              <NavLink
                to={item.slug}
                end={true}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-semibold block w-full px-5 py-2"
                    : "block w-full px-5 py-2"
                }
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>

        <div className="sm:flex flex-row gap-8 hidden">
          {navItems.map((item) => (
            <div key={item.slug}>
              <NavLink
                to={item.slug}
                end={true}
                className={({ isActive }) =>
                  isActive ? "text-blue-700 font-semibold" : ""
                }
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
