import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", slug: "/" },
    { name: "PassGenerator", slug: "/passgenerator" },
  ];

  return (
    <>
      <nav className="flex justify-between px-4 lg:px-32 items-center fixed bg-sky-200 w-screen h-16">
        <div className="text-3xl font-semibold select-none cursor-pointer">
          <NavLink to="/" className={"flex items-center"}>
            PassLocker
            <img src="padlock.png" alt="Lock Image" className="h-8 ml-1" />
          </NavLink>
        </div>
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.slug}>
              <NavLink
                to={item.slug}
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
