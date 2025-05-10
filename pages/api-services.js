import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function ApiServicesPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        
        if (!res.ok) {
          throw new Error('Failed to fetch API services');
        }
        
        const data = await res.json();
        setServices(data.services || []);
        
        // Set active tab to first service if available
        if (data.services && data.services.length > 0) {
          setActiveTab(data.services[0].id);
        }
      } catch (err) {
        console.error('Error fetching API services:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Find the active service
  const activeService = services.find(service => service.id === activeTab);

  return (
    <Layout
      title="Our API Services - FreeAPI Directory"
      description="Explore and use our custom API services for your projects"
    >
      <Head>
        <title>Our API Services - FreeAPI Directory</title>
        <meta name="description" content="Explore and use our custom API services for your projects" />
      </Head>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Our API Services
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          These are our own custom-built API services that you can use freely in your projects. 
          Each service provides realistic data and functionality without requiring any API keys.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Service tabs */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Available Services
              </h2>
              <nav className="space-y-1">
                {services.map(service => (
                  <button
                    key={service.id}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium 
                      ${activeTab === service.id 
                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    onClick={() => setActiveTab(service.id)}
                  >
                    {service.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Service details */}
          <div className="w-full lg:w-3/4">
            {activeService && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {activeService.name}
                </h2>
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {activeService.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {activeService.description}
                </p>

                {/* Endpoints */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Available Endpoints
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Method
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Endpoint
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                          {activeService.endpoints.map((endpoint, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded text-xs font-semibold">
                                  {endpoint.method}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono">
                                {endpoint.path}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                {endpoint.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Example */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Example
                  </h3>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Request
                    </div>
                    <div className="bg-gray-800 text-white p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      GET {activeService.example.request}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Response
                    </div>
                    <div className="bg-gray-800 text-white p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{JSON.stringify(activeService.example.response, null, 2)}</pre>
                    </div>
                  </div>
                </div>

                {/* Try it now */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Try It Out
                  </h3>
                  <p className="text-blue-700 dark:text-blue-200 mb-3 text-sm">
                    This API is live and ready to use. You can make requests directly from your application 
                    or try it in your browser.
                  </p>
                  <a 
                    href={activeService.example.request} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Test API in Browser
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Integration guide */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-2xl font-bold text-white sm:text-3xl sm:tracking-tight">
                  Ready to integrate these APIs?
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-indigo-100">
                  Our documentation provides all the details you need to integrate these services into your applications.
                  All APIs are free to use and don't require any authentication.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    View Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}