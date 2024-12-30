
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo/6.png";


const Navbar = () => {
  return (
    <div className="bg-[#60259f] top-0 left-0 right-0 z-50 flex items-center py-2 shadow-md fixed w-full h-12">
      <div className="container mx-auto flex items-center gap-6 pl-4">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} height={30} />
        </Link>
      </div>

       
      <nav className="ml-auto mr-4">
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="flex gap-2 items-center font-bold text-white hover:text-opacity-75 transition-all ease-linear whitespace-nowrap"
            >
              
              <h3>Accueil</h3>
            </Link>
          </li>
          <li>
            <Link
              href="/filter/all"
              className="flex gap-2 items-center font-bold text-white hover:text-opacity-75 transition-all ease-linear whitespace-nowrap"
            >
              
              <h3>Endroits</h3>
            </Link>
          </li>
          {/* <li>
            <Link
              href="/aboutUs"
              className="flex gap-2 items-center font-bold text-white hover:text-opacity-75 transition-all ease-linear whitespace-nowrap"
            >
              
              <h3>À propos</h3>
            </Link>
          </li> */}
          <li>
            <Link
              href="/connexion"
              className="flex gap-2 items-center font-bold text-white hover:text-opacity-75 transition-all ease-linear whitespace-nowrap"
            >
              
              <h3>Connexion</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
