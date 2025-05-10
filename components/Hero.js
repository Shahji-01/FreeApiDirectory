import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24 rounded-lg overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path fillRule="evenodd" clipRule="evenodd" d="M21 28v42h58V28H21zm54 4v34H25V32h50z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M42 48a8 8 0 100-16 8 8 0 000 16zm0-12a4 4 0 110 8 4 4 0 010-8z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M58 64a8 8 0 100-16 8 8 0 000 16zm0-12a4 4 0 110 8 4 4 0 010-8z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M33 70l34-40 4 4-34 40-4-4z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Discover Free APIs for Your Next Project
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explore our curated collection of free and open APIs to integrate into your applications.
          </p>

          <div className="max-w-3xl mx-auto mb-8">
            <SearchBar className="shadow-lg" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/search">
              <a className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-300 shadow-md">
                Browse All APIs
              </a>
            </Link>
            <Link href="/api/submit">
              <a className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 shadow-md">
                Submit an API
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
