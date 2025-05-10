import { useState, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  // Used to prevent hydration mismatch when using localStorage for theme
  useEffect(() => {
    setMounted(true);
  }, []);

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

  return <Component {...pageProps} />;
}

export default MyApp;
