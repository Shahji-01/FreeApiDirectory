import { useState, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/animations.css';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Used to prevent hydration mismatch when using localStorage for theme
  useEffect(() => {
    setMounted(true);
    
    // Set page as loaded after a short delay for animations
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
  }, []);

  // Add scroll reveal animations
  useEffect(() => {
    if (!mounted) return;
    
    // Initialize Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all elements with reveal-on-scroll class
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [mounted]);

  // Re-initialize scroll animations after route changes
  useEffect(() => {
    if (!mounted) return;
    
    // Re-observe elements after route changes
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Delay slightly to ensure DOM is updated
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 200);
    
    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [mounted, Component]);

  if (!mounted) {
    return (
      <>
        <Head>
          <title>FreeAPI Directory</title>
          <meta name="description" content="Discover and use free APIs for your next project" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{ visibility: 'hidden' }}>Loading...</div>
      </>
    );
  }

  return (
    <div className={isPageLoaded ? 'animate-fade-in' : 'opacity-0'}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
