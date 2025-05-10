import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24 rounded-lg overflow-hidden animated-gradient-bg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 animate-float">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path fillRule="evenodd" clipRule="evenodd" d="M21 28v42h58V28H21zm54 4v34H25V32h50z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M42 48a8 8 0 100-16 8 8 0 000 16zm0-12a4 4 0 110 8 4 4 0 010-8z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M58 64a8 8 0 100-16 8 8 0 000 16zm0-12a4 4 0 110 8 4 4 0 010-8z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M33 70l34-40 4 4-34 40-4-4z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-slide-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate-gradient">
              Discover Free APIs
            </span>
            <span className="block mt-2">for Your Next Project</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up delay-300">
            Explore our curated collection of free and open APIs to integrate into your applications.
          </p>

          <div className="max-w-3xl mx-auto mb-8 animate-scale-in delay-500">
            <SearchBar className="shadow-lg hover-glow transition-all" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-slide-up delay-600">
            <Link 
              href="/api-services"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-300 shadow-md hover-shadow"
            >
              Browse All APIs
            </Link>
            <Link 
              href="/api-documentation"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 shadow-md hover-glow"
            >
              API Documentation
            </Link>
          </div>
          
          {/* Feature cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover-float transition-all animate-fade-in delay-700 reveal-on-scroll">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast & Reliable</h3>
              <p className="text-blue-100">Instant access to API resources with quick response times and high availability</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover-float transition-all animate-fade-in delay-800 reveal-on-scroll">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customizable</h3>
              <p className="text-blue-100">Extensive parameters and options to tailor API responses to your specific needs</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover-float transition-all animate-fade-in delay-900 reveal-on-scroll">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No API Keys</h3>
              <p className="text-blue-100">Get started immediately with no authentication or API keys required</p>
            </div>
          </div>
          
          {/* Animated scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg className="w-8 h-8 mx-auto text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
