import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function ApiDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [api, setApi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchApiDetails = async () => {
      try {
        const res = await fetch(`/api/apis/${id}`);
        
        if (!res.ok) {
          throw new Error('API not found');
        }
        
        const data = await res.json();
        setApi(data.api);
      } catch (err) {
        console.error('Error fetching API details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !api) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {error || 'API not found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The API you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${api.name} API - FreeAPI Directory`}
      description={api.description}
    >
      <Head>
        <title>{api.name} API - FreeAPI Directory</title>
        <meta name="description" content={api.description} />
      </Head>

      <div className="mb-6">
        <Link 
          href={api.category ? `/category/${api.category}` : '/search'}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center"
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to {api.category ? api.category : 'search'} 
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* API Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
          <div className="flex items-center">
            <div className="mr-6 bg-white rounded-lg p-3 shadow-md">
              <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{api.name}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <Link 
                  href={`/category/${api.category}`}
                  className="text-xs px-3 py-1 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30"
                >
                  {api.category}
                </Link>
                <span className="text-xs px-3 py-1 bg-white bg-opacity-20 text-white rounded-full">
                  Auth: {api.auth}
                </span>
                <span className="text-xs px-3 py-1 bg-white bg-opacity-20 text-white rounded-full">
                  HTTPS: {api.https}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* API Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{api.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">API URL</div>
                <div className="text-gray-800 dark:text-white font-medium break-all">
                  <a 
                    href={api.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {api.link}
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Added on</div>
                <div className="text-gray-800 dark:text-white font-medium">
                  {new Date(api.addedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Authentication</div>
                <div className="text-gray-800 dark:text-white font-medium">
                  {api.auth}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">HTTPS Support</div>
                <div className="text-gray-800 dark:text-white font-medium">
                  {api.https}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center">
            <div>
              <a 
                href={api.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Visit API
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  navigator.clipboard.writeText(api.link);
                  alert('API URL copied to clipboard!');
                }}
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy URL
              </button>
              
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=Check out this API: ${api.name}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                }}
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggest similar APIs */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Similar APIs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* This would normally fetch similar APIs from the backend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Looking for similar APIs?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Check out more APIs in the {api.category} category
            </p>
            <Link 
              href={`/category/${api.category}`}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Browse category
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Have a similar API?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Submit your API to be included in our directory
            </p>
            <Link 
              href="/api/submit"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Submit API
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Search for APIs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Find more APIs with our powerful search
            </p>
            <Link 
              href="/search"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Search APIs
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}