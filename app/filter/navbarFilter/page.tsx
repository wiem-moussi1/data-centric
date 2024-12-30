"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

const NavbarFilter = () => {
  const pathname = usePathname(); 

  return (
    <div className="fixed top-12 left-0 w-full bg-white py-2 shadow-md z-50">
      
      <nav className="container mx-auto">
        <ul className="flex justify-center items-center gap-10">
          <li>
            <Link
              href="/filter/all"
              className={`font-bold text-black hover:text-opacity-75 transition-all ease-linear whitespace-nowrap 
                ${
                  pathname === "/filter/all"
                    ? "text-[#5f259f] border-b-2 border-[#5f259f]"
                    : ""
                }`}
            >
              Tous les endroits
            </Link>
          </li>
          <li>
            <Link
              href="/filter/activities"
              className={`font-bold text-black hover:text-opacity-75 transition-all ease-linear whitespace-nowrap 
                ${
                  pathname === "/filter/activities"
                    ? "text-[#5f259f] border-b-2 border-[#5f259f]"
                    : ""
                }`}
            >
              Équipements et Activités
            </Link>
          </li>
          <li>
            <Link
              href="/filter/greenSpaces"
              className={`font-bold text-black hover:text-opacity-75 transition-all ease-linear whitespace-nowrap 
                ${
                  pathname === "/filter/greenSpaces"
                    ? "text-[#5f259f] border-b-2 border-[#5f259f]"
                    : ""
                }`}
            >
              Espaces Verts
            </Link>
          </li>
          <li>
            <Link
              href="/filter/fountains"
              className={`font-bold text-black hover:text-opacity-75 transition-all ease-linear whitespace-nowrap 
                ${
                  pathname === "/filter/fountains"
                    ? "text-[#5f259f] border-b-2 border-[#5f259f]"
                    : ""
                }`}
            >
              Fontaines à Boire
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarFilter;
