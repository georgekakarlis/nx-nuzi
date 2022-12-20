import React, {useState} from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-3">
      <div className="container mx-auto flex items-center justify-between flex-wrap ">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ">
          <Link href="/" legacyBehavior>
            <div className="font-semibold text-xl tracking-tight">
              Nuzi
            </div>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
            <Link href="/about" legacyBehavior>
              <a onClick={toggleMenu} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                About
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a onClick={toggleMenu} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                Contact
              </a>
            </Link>
          </div>
          <div>
            <a href="#" onClick={toggleMenu} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
