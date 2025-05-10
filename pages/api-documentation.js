import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function ApiDocumentationPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        
        if (!res.ok) {
          throw new Error('Failed to fetch API services');
        }
        
        const data = await res.json();
        setServices(data.services || []);
        
        // Set the first service as selected by default
        if (data.services && data.services.length > 0) {
          setSelectedService(data.services[0]);
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

  // Function to handle service selection
  const handleServiceSelect = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
    }
  };

  // Function to format method for display with color
  const getMethodBadgeClass = (method) => {
    switch (method.toUpperCase()) {
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

  return (
    <Layout
      title="API Documentation - FreeAPI Directory"
      description="Comprehensive documentation for our free API services"
    >
      <Head>
        <title>API Documentation - FreeAPI Directory</title>
        <meta name="description" content="Comprehensive documentation for our free API services" />
      </Head>

      <div className="pb-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Comprehensive guides and reference for all our free API services. Explore endpoints, parameters, 
            and example code to integrate these APIs into your applications.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error Loading Documentation</h3>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 rounded-md hover:bg-red-200 dark:hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Service List */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 border-b border-indigo-100 dark:border-indigo-800">
                  <h2 className="font-semibold text-indigo-800 dark:text-indigo-200">Available APIs</h2>
                </div>
                <nav className="p-2">
                  <ul className="space-y-1">
                    {services.map(service => (
                      <li key={service.id}>
                        <button
                          onClick={() => handleServiceSelect(service.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium flex items-center
                            ${selectedService?.id === service.id 
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }`}
                        >
                          <span className="mr-2">{service.icon || '📦'}</span>
                          {service.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main content - API Documentation */}
            {selectedService && (
              <div className="w-full lg:w-3/4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  {/* Service header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/20">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{selectedService.icon || '📦'}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedService.name}</h2>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                            {selectedService.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service content */}
                  <div className="p-6">
                    {/* Description */}
                    <section className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Overview</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedService.longDescription || selectedService.description}
                      </p>
                    </section>

                    {/* Base URL */}
                    <section className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Base URL</h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <code className="text-indigo-600 dark:text-indigo-300">https://freeapi.app/api/services/{selectedService.id}</code>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        All endpoints are relative to this base URL. No authentication is required.
                      </p>
                    </section>

                    {/* Endpoints */}
                    <section className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Endpoints</h3>
                      <div className="space-y-4">
                        {selectedService.endpoints.map((endpoint, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodBadgeClass(endpoint.method)}`}>
                                {endpoint.method}
                              </span>
                              <div className="ml-3">
                                <div className="font-mono text-sm text-gray-800 dark:text-gray-200">
                                  {endpoint.path}
                                </div>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  {endpoint.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Parameters */}
                    {selectedService.parameters && selectedService.parameters.length > 0 && (
                      <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Request Parameters</h3>
                        <div className="overflow-x-auto">
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
                              {selectedService.parameters.map((param, index) => (
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
                      </section>
                    )}

                    {/* Request Body */}
                    {selectedService.requestBody && (
                      <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Request Body</h3>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            <p className="mb-2">Type: <span className="font-semibold">{selectedService.requestBody.type}</span></p>
                            {Object.entries(selectedService.requestBody.properties).map(([propName, propData], index) => (
                              <div key={index} className="mb-3">
                                <p className="font-mono text-indigo-600 dark:text-indigo-400">{propName}</p>
                                <ul className="pl-5 mt-1 space-y-1 list-disc">
                                  <li>Type: {propData.type}</li>
                                  <li>Description: {propData.description}</li>
                                  {propData.required !== undefined && (
                                    <li>Required: <span className={propData.required ? 'text-red-500' : 'text-gray-400'}>{propData.required ? 'Yes' : 'No'}</span></li>
                                  )}
                                  {propData.default !== undefined && (
                                    <li>Default: {propData.default}</li>
                                  )}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Examples */}
                    <section className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Example</h3>
                      
                      {/* Request */}
                      <div className="mb-4">
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Request</h4>
                        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="whitespace-pre">GET {selectedService.example.request}</pre>
                        </div>
                      </div>
                      
                      {/* Response */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Response</h4>
                        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="whitespace-pre">{JSON.stringify(selectedService.example.response, null, 2)}</pre>
                        </div>
                      </div>
                    </section>

                    {/* Try it now */}
                    <section className="mb-8">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
                        <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Try it now</h3>
                        <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                          This API is live and ready to use. You can make requests directly from your application 
                          or try it in your browser using the link below.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <a 
                            href={selectedService.example.request} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Test in Browser
                            <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                          
                          <a 
                            href="/api-services"
                            className="inline-flex items-center px-4 py-2 border border-indigo-300 dark:border-indigo-700 text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            View All API Services
                          </a>
                        </div>
                      </div>
                    </section>

                    {/* Code examples */}
                    <section>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Code Examples</h3>
                      
                      {/* Tabs */}
                      <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-4">
                          <button className="border-indigo-500 text-indigo-600 dark:text-indigo-400 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                            JavaScript
                          </button>
                          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                            Python
                          </button>
                          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                            cURL
                          </button>
                        </nav>
                      </div>
                      
                      {/* Code examples */}
                      <div className="mt-4">
                        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="whitespace-pre">{`// Fetch data from ${selectedService.name}
fetch('${selectedService.example.request}')
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
  });`}</pre>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional resources */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Ready to start building?</h2>
              <p className="max-w-2xl text-purple-100">
                Explore our API services and integrate them into your applications today. All APIs are free to use with no authentication required.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/api-services"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-700 bg-white hover:bg-purple-50"
              >
                View All API Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}