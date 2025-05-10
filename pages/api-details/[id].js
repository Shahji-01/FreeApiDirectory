import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function ApiDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeCodeTab, setActiveCodeTab] = useState('javascript');
  const [liveResponse, setLiveResponse] = useState(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState(null);

  // Fetch API details
  useEffect(() => {
    if (!id) return;

    const fetchApiDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/services?id=${id}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch API details: ${res.status}`);
        }
        
        const data = await res.json();
        setApiData(data);
      } catch (err) {
        console.error('Error fetching API details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiDetails();
  }, [id]);

  // Function to format method for display with color
  const getMethodBadgeClass = (method) => {
    switch (method?.toUpperCase()) {
      case 'GET':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'POST':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  // Generate code examples for different languages
  const generateCodeExample = (endpoint, language) => {
    const baseUrl = `https://freeapi.app/api/services/${id}`;
    const fullUrl = endpoint ? baseUrl + endpoint.path.replace(`/api/services/${id}`, '') : baseUrl;
    
    switch (language) {
      case 'javascript':
        return `// Using fetch with JavaScript
fetch('${fullUrl}')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    // Process your data here
  })
  .catch(error => {
    console.error('Error:', error);
  });`;

      case 'python':
        return `# Using requests with Python
import requests

response = requests.get('${fullUrl}')
if response.status_code == 200:
    data = response.json()
    print('Success:', data)
    # Process your data here
else:
    print('Error:', response.status_code)`;

      case 'curl':
        return `# Using curl in terminal
curl -X GET '${fullUrl}' \\
  -H 'Content-Type: application/json'`;

      case 'node':
        return `// Using axios with Node.js
const axios = require('axios');

axios.get('${fullUrl}')
  .then(response => {
    console.log('Success:', response.data);
    // Process your data here
  })
  .catch(error => {
    console.error('Error:', error);
  });`;

      case 'php':
        return `<?php
// Using cURL with PHP
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${fullUrl}');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
echo "Success: ";
print_r($data);
// Process your data here
?>`;

      default:
        return '';
    }
  };

  // Function to test API endpoint in real time
  const testEndpoint = async (endpoint) => {
    try {
      setLiveLoading(true);
      setLiveError(null);
      
      const res = await fetch(endpoint.path);
      
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      setLiveResponse(data);
    } catch (err) {
      console.error('Error testing API endpoint:', err);
      setLiveError(err.message);
    } finally {
      setLiveLoading(false);
    }
  };

  return (
    <Layout
      title={apiData ? `${apiData.name} API - FreeAPI Directory` : 'API Details - FreeAPI Directory'}
      description={apiData?.description || 'Detailed information about our API service'}
    >
      <Head>
        <title>{apiData ? `${apiData.name} API - FreeAPI Directory` : 'API Details - FreeAPI Directory'}</title>
        <meta name="description" content={apiData?.description || 'Detailed information about our API service'} />
      </Head>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error Loading API Details</h3>
              <div className="mt-2 text-base text-red-700 dark:text-red-300">
                <p>{error}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-red-300 dark:border-red-700 text-sm font-medium rounded-md text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => router.reload()}
                    className="px-4 py-2 bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 rounded-md hover:bg-red-200 dark:hover:bg-red-700 text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !apiData ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">API Not Found</h3>
              <div className="mt-2 text-base text-yellow-700 dark:text-yellow-300">
                <p>The API with ID "{id}" could not be found.</p>
                <div className="mt-4">
                  <Link
                    href="/api-services"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    View All APIs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <Link href="/api-services" className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 md:ml-2">
                    API Services
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 font-medium text-indigo-600 dark:text-indigo-400 md:ml-2">{apiData.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* API Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">{apiData.icon || '📦'}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{apiData.name}</h1>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                    {apiData.category}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xl opacity-90 max-w-3xl">
              {apiData.description}
            </p>
          </div>

          {/* Navigation tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('endpoints')}
                className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'endpoints'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Endpoints
              </button>
              <button
                onClick={() => setActiveTab('parameters')}
                className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'parameters'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Parameters
              </button>
              <button
                onClick={() => setActiveTab('examples')}
                className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'examples'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Examples
              </button>
              <button
                onClick={() => setActiveTab('playground')}
                className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'playground'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Playground
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">About this API</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {apiData.longDescription || apiData.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Base URL</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-indigo-600 dark:text-indigo-300">https://freeapi.app/api/services/{apiData.id}</code>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    All endpoints are relative to this base URL. No authentication is required.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex items-start bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">No Authentication</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Free to use without API keys or tokens</p>
                      </div>
                    </li>
                    <li className="flex items-start bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">JSON Format</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">All responses are in JSON format</p>
                      </div>
                    </li>
                    <li className="flex items-start bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">CORS Enabled</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Works with web applications on any domain</p>
                      </div>
                    </li>
                    <li className="flex items-start bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Consistent Responses</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Clear status codes and error messages</p>
                      </div>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Quick Start</h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
                    <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                      Try this simple example to get started with the {apiData.name}:
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-md p-4 font-mono text-sm mb-4 overflow-x-auto">
                      <code className="text-gray-800 dark:text-gray-200">{apiData.example.request}</code>
                    </div>
                    <a 
                      href={apiData.example.request} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Try it now
                      <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </section>
              </div>
            )}

            {/* Endpoints Tab */}
            {activeTab === 'endpoints' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">API Endpoints</h2>
                
                {apiData.endpoints.map((endpoint, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${getMethodBadgeClass(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <div className="ml-3 font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                          {endpoint.path}
                        </div>
                      </div>
                      <a
                        href={endpoint.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-800 dark:text-white mb-1">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {endpoint.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Example Request</h4>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 font-mono text-xs overflow-x-auto">
                            <code className="text-gray-800 dark:text-gray-200">{endpoint.path}</code>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Parameters</h4>
                          {endpoint.path.includes('?') ? (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 text-xs">
                              {endpoint.path.split('?')[1].split('&').map((param, i) => {
                                const [key, value] = param.split('=');
                                return (
                                  <div key={i} className="mb-1 last:mb-0">
                                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{key}</span>
                                    {value && (
                                      <span className="text-gray-600 dark:text-gray-300"> = {value}</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 text-xs text-gray-500 dark:text-gray-400">
                              No parameters required
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={() => {
                            setActiveTab('playground');
                            // If you want to pre-select this endpoint in the playground
                            // You would need to add state for the selected endpoint
                          }}
                          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center"
                        >
                          Try in playground
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => {
                            // Copy the endpoint URL to clipboard
                            navigator.clipboard.writeText(endpoint.path);
                          }}
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center"
                        >
                          <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy URL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Parameters Tab */}
            {activeTab === 'parameters' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">API Parameters</h2>
                
                {apiData.parameters && apiData.parameters.length > 0 ? (
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Required
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Default
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {apiData.parameters.map((param, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                              {param.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {param.type}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                              {param.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {param.required ? (
                                <span className="text-red-500">Yes</span>
                              ) : (
                                <span className="text-gray-400 dark:text-gray-500">No</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {param.default || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No parameters required for this API.</p>
                )}
                
                {/* Request Body */}
                {apiData.requestBody && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Request Body</h3>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <p className="mb-4">Type: <span className="font-semibold">{apiData.requestBody.type}</span></p>
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Properties</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(apiData.requestBody.properties).map(([propName, propData], index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                              <p className="font-mono text-indigo-600 dark:text-indigo-400 font-medium">{propName}</p>
                              <ul className="mt-2 space-y-1 text-sm">
                                <li><span className="font-semibold">Type:</span> {propData.type}</li>
                                <li><span className="font-semibold">Description:</span> {propData.description}</li>
                                {propData.required !== undefined && (
                                  <li>
                                    <span className="font-semibold">Required:</span> 
                                    <span className={propData.required ? 'text-red-500 ml-1' : 'text-gray-400 ml-1'}>
                                      {propData.required ? 'Yes' : 'No'}
                                    </span>
                                  </li>
                                )}
                                {propData.default !== undefined && (
                                  <li><span className="font-semibold">Default:</span> {propData.default.toString()}</li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Response Format */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Response Format</h3>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Success Response (200 OK)</h4>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-800 dark:text-gray-200">{JSON.stringify(apiData.example.response, null, 2)}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Error Responses</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">400 Bad Request</p>
                          <pre className="text-xs text-gray-800 dark:text-gray-200">{`{
  "error": "Invalid parameter: [parameter name]"
}`}</pre>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">404 Not Found</p>
                          <pre className="text-xs text-gray-800 dark:text-gray-200">{`{
  "error": "Resource not found"
}`}</pre>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">500 Internal Server Error</p>
                          <pre className="text-xs text-gray-800 dark:text-gray-200">{`{
  "error": "Internal server error"
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Examples Tab */}
            {activeTab === 'examples' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Code Examples</h2>
                
                {/* Programming language tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                  <nav className="-mb-px flex space-x-4 overflow-x-auto">
                    {['javascript', 'python', 'curl', 'node', 'php'].map(language => (
                      <button
                        key={language}
                        onClick={() => setActiveCodeTab(language)}
                        className={`whitespace-nowrap py-2 px-3 border-b-2 font-medium text-sm focus:outline-none ${
                          activeCodeTab === language
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        {language === 'javascript' ? 'JavaScript' :
                         language === 'python' ? 'Python' :
                         language === 'curl' ? 'cURL' :
                         language === 'node' ? 'Node.js' :
                         language === 'php' ? 'PHP' : language}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Code example based on selected language */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {activeCodeTab === 'javascript' ? 'JavaScript (Fetch)' :
                       activeCodeTab === 'python' ? 'Python (Requests)' :
                       activeCodeTab === 'curl' ? 'cURL (Terminal)' :
                       activeCodeTab === 'node' ? 'Node.js (Axios)' :
                       activeCodeTab === 'php' ? 'PHP (cURL)' : activeCodeTab}
                    </h4>
                    <button 
                      onClick={() => {
                        // Copy code to clipboard
                        navigator.clipboard.writeText(generateCodeExample(
                          apiData.endpoints[0],
                          activeCodeTab
                        ));
                      }}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy Code
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre className="whitespace-pre">{generateCodeExample(
                        apiData.endpoints[0],
                        activeCodeTab
                      )}</pre>
                    </div>
                  </div>
                </div>
                
                {/* Additional usage examples */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Additional Examples</h3>
                  
                  <div className="space-y-4">
                    {apiData.endpoints.slice(1, 3).map((endpoint, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 dark:text-white mb-2">{endpoint.description}</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 mb-2 font-mono text-sm">
                          <code className="text-gray-800 dark:text-gray-200">{endpoint.path}</code>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Use this endpoint to {endpoint.description.toLowerCase()}
                        </p>
                        <button
                          onClick={() => {
                            // Copy the code for this specific endpoint
                            navigator.clipboard.writeText(generateCodeExample(endpoint, activeCodeTab));
                          }}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center"
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy Code for this Endpoint
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Playground Tab */}
            {activeTab === 'playground' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">API Playground</h2>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-800 dark:text-white">Test the API</h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select an endpoint
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        onChange={(e) => {
                          // Find the selected endpoint and set it for the playground
                          const endpoint = apiData.endpoints.find((ep, i) => i === parseInt(e.target.value));
                          // Reset previous responses
                          setLiveResponse(null);
                          setLiveError(null);
                        }}
                      >
                        {apiData.endpoints.map((endpoint, index) => (
                          <option key={index} value={index}>
                            {endpoint.method} {endpoint.path}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Request URL
                        </label>
                        <button
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                          onClick={() => {
                            // Copy the selected endpoint URL
                            navigator.clipboard.writeText(apiData.endpoints[0].path);
                          }}
                        >
                          Copy URL
                        </button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-md px-3 py-2 font-mono text-sm mb-2">
                        {apiData.endpoints[0].path}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mb-6">
                      <button
                        onClick={() => testEndpoint(apiData.endpoints[0])}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={liveLoading}
                      >
                        {liveLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Testing...
                          </>
                        ) : (
                          <>
                            Send Request
                            <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Response section */}
                    {(liveResponse || liveError) && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="font-medium text-gray-800 dark:text-white mb-2">Response</h4>
                        
                        {liveError ? (
                          <div className="bg-red-50 dark:bg-red-900/30 rounded-md p-3 mb-3">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h5 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h5>
                                <p className="mt-1 text-sm text-red-700 dark:text-red-300">{liveError}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center text-sm text-green-700 dark:text-green-300 mb-2">
                              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Request successful: 200 OK
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 overflow-x-auto">
                              <pre className="text-sm text-gray-800 dark:text-gray-200">{JSON.stringify(liveResponse, null, 2)}</pre>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
                  <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200 mb-2">Integration Tips</h3>
                  <ul className="mt-4 text-indigo-700 dark:text-indigo-300 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span>Use proper error handling in your requests</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span>Implement caching for better performance</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span>Use appropriate HTTP status codes for error handling</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Related APIs */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Related APIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services
                .filter(service => service.category === apiData.category && service.id !== apiData.id)
                .slice(0, 3)
                .map(service => (
                  <Link
                    key={service.id}
                    href={`/api-details/${service.id}`}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{service.icon || '📦'}</span>
                      <h3 className="font-medium text-gray-800 dark:text-white">{service.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {service.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>

          {/* Help section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-center mb-4">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200">Documentation</h3>
              </div>
              <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                Need more detailed information? Check out our API documentation for comprehensive guides, examples, and reference materials.
              </p>
              <Link
                href={`/api-documentation#${apiData.id}`}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center"
              >
                View full documentation
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-100 dark:border-green-800">
              <div className="flex items-center mb-4">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Need Help?</h3>
              </div>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Have questions about this API? Check out our FAQs or contact our support team for assistance.
              </p>
              <a
                href="#"
                className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 inline-flex items-center"
              >
                Contact support
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}