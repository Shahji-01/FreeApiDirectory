import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">FreeAPI Directory</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              href="/" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${router.pathname === '/' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/search" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${router.pathname === '/search' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
            >
              Browse
            </Link>
            <Link 
              href="/api-services" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${router.pathname === '/api-services' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
            >
              Our APIs
            </Link>
            <Link 
              href="/api-documentation" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${router.pathname === '/api-documentation' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
            >
              API Docs
            </Link>
            <Link 
              href="/submit-api" 
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            >
              Submit API
            </Link>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/"
            className={`block px-3 py-2 rounded-md ${router.pathname === '/' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Home
          </Link>
          <Link 
            href="/search"
            className={`block px-3 py-2 rounded-md ${router.pathname === '/search' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Browse
          </Link>
          <Link 
            href="/api-services"
            className={`block px-3 py-2 rounded-md ${router.pathname === '/api-services' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Our APIs
          </Link>
          <Link 
            href="/api-documentation"
            className={`block px-3 py-2 rounded-md ${router.pathname === '/api-documentation' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            API Docs
          </Link>
          <Link 
            href="/submit-api"
            className="block px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit API
          </Link>
        </div>
      </div>
    </nav>
  );
}
