import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function AdminLayout({ children, title }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          router.push('/admin/login');
          return;
        }
        
        // Verify token with API
        const res = await fetch('/api/admin/auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        if (res.ok) {
          setIsAuthenticated(true);
          
          // Get user info from localStorage
          const userInfo = localStorage.getItem('adminUser');
          if (userInfo) {
            try {
              const userData = JSON.parse(userInfo);
              setUsername(userData.username || 'Admin');
            } catch (e) {
              console.error('Failed to parse user data', e);
            }
          }
        } else {
          // Token is invalid, clear localStorage and redirect
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    // Check client-side only
    if (typeof window !== 'undefined') {
      checkAuth();

      // Check theme preference
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, [router]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    // Remove token and user info from localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Redirect to login page
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      {/* Admin navbar */}
      <nav className="bg-indigo-700 dark:bg-indigo-900 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin" legacyBehavior>
                <a className="flex items-center">
                  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                  </svg>
                  <span className="ml-2 text-xl font-bold text-white">Admin Dashboard</span>
                </a>
              </Link>
            </div>
            
            <div className="flex items-center space-x-5">
              <div className="mr-2 text-sm text-white">
                Welcome, {username}
              </div>
            
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              
              <Link href="/" legacyBehavior>
                <a className="text-indigo-100 hover:text-white hover:underline transition duration-150">
                  View Site
                </a>
              </Link>
              
              <button
                onClick={handleLogout}
                className="bg-indigo-800 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Admin content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 dark:text-indigo-300">
            {title}
          </h1>
          <div className="h-1 w-20 bg-indigo-600 mt-2"></div>
        </div>
        
        {children}
      </main>
      
      {/* Admin footer */}
      <footer className="bg-indigo-700 dark:bg-indigo-900 text-white py-4 shadow-inner">
        <div className="container mx-auto px-4">
          <p className="text-center text-indigo-100 text-sm">
            &copy; {new Date().getFullYear()} FreeAPI Directory Admin
          </p>
        </div>
      </footer>
    </div>
  );
}
