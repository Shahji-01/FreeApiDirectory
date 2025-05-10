import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-800 shadow-inner pt-10 pb-6 reveal-on-scroll">
      {/* Gradient divider */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400 animate-gradient"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="col-span-1 md:col-span-2 reveal-on-scroll">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <span className="mr-2 text-indigo-500 dark:text-indigo-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              About FreeAPI Directory
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A comprehensive directory of free APIs for developers. Find the perfect API for your next project, submit your own, and contribute to the community.
            </p>
            
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 text-center">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-xl">10+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">API Categories</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 text-center">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-xl">50+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Free Endpoints</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 text-center">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-xl">0</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">API Keys Required</div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors hover-float"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors hover-float"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors hover-float"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="reveal-on-scroll">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <span className="mr-2 text-indigo-500 dark:text-indigo-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </span>
              Quick Links
            </h3>
            <ul className="space-y-2 stagger-animation">
              <li className="hover-float transition-all">
                <Link href="/" className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 flex items-center transition-colors">
                  <svg className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
              </li>
              <li className="hover-float transition-all">
                <Link href="/api-services" className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 flex items-center transition-colors">
                  <svg className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Browse APIs
                </Link>
              </li>
              <li className="hover-float transition-all">
                <Link href="/api-documentation" className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 flex items-center transition-colors">
                  <svg className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="reveal-on-scroll">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <span className="mr-2 text-indigo-500 dark:text-indigo-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              Resources
            </h3>
            <ul className="space-y-2 stagger-animation">
              <li className="hover-float transition-all">
                <Link href="/admin" className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 flex items-center transition-colors">
                  <svg className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Admin Panel
                </Link>
              </li>
              <li className="hover-float transition-all">
                <Link href="/submit-api" className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 flex items-center transition-colors">
                  <svg className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit API
                </Link>
              </li>
              <li className="hover-float transition-all">
                <a href="#" className="text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 flex items-center transition-colors">
                  <svg className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg shadow-lg reveal-on-scroll">
          <div className="md:flex items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h4 className="font-semibold text-white text-lg">Stay updated with the latest APIs</h4>
              <p className="text-sm text-indigo-100">Get the latest API updates and news directly to your inbox</p>
            </div>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 border border-indigo-400 dark:border-indigo-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200 w-full"
              />
              <button className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-r-md hover:bg-indigo-50 transition-colors shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 text-center reveal-on-scroll">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Terms</a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a href="#" className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Privacy</a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a href="#" className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">API Policy</a>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            &copy; {new Date().getFullYear()} FreeAPI Directory. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center">
            <span>Built with</span>
            <span className="mx-1 text-red-500">❤️</span>
            <span>using</span>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="mx-1 text-black dark:text-white font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Next.js</a>
            <span>and</span>
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="mx-1 text-sky-500 font-semibold hover:text-sky-600 transition-colors">Tailwind CSS</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
