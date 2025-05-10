import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function ApiDocumentationPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCodeTab, setActiveCodeTab] = useState('javascript');
  const [visibleLanguages, setVisibleLanguages] = useState(['javascript', 'python', 'curl']);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        
        if (!res.ok) {
          throw new Error('Failed to fetch API services');
        }
        
        const data = await res.json();
        const sortedServices = (data.services || []).sort((a, b) => a.name.localeCompare(b.name));
        setServices(sortedServices);
        
        // Check for service in URL hash
        const hashServiceId = window.location.hash.replace('#', '');
        const hashService = hashServiceId && sortedServices.find(s => s.id === hashServiceId);
        
        // Set the service from hash or first service as selected by default
        if (hashService) {
          setSelectedService(hashService);
        } else if (sortedServices && sortedServices.length > 0) {
          setSelectedService(sortedServices[0]);
        }
      } catch (err) {
        console.error('Error fetching API services:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
    
    // Add hash change listener for direct linking
    const handleHashChange = () => {
      const serviceId = window.location.hash.replace('#', '');
      if (serviceId && services.length > 0) {
        const service = services.find(s => s.id === serviceId);
        if (service) setSelectedService(service);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when selected service changes
  useEffect(() => {
    if (selectedService) {
      window.location.hash = selectedService.id;
    }
  }, [selectedService]);

  // Reset selected tab when service changes
  useEffect(() => {
    setSelectedTab('overview');
    setActiveCodeTab('javascript');
  }, [selectedService]);

  // Function to handle service selection
  const handleServiceSelect = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
    }
  };
  
  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter services based on search query
  const filteredServices = searchQuery
    ? services.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : services;

  // Group services by category
  const servicesByCategory = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});
  
  // Sort categories
  const sortedCategories = Object.keys(servicesByCategory).sort();

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
  
  // Generate code examples for different languages
  const generateCodeExample = (endpoint, language, service) => {
    const baseUrl = `https://freeapi.app/api/services/${service.id}`;
    const fullUrl = endpoint ? baseUrl + endpoint.path.replace(`/api/services/${service.id}`, '') : baseUrl;
    
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
          
          {/* Search bar */}
          <div className="mt-6 max-w-md relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <div className="absolute left-3 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
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
            <div className="w-full lg:w-1/4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 border-b border-indigo-100 dark:border-indigo-800">
                  <h2 className="font-semibold text-indigo-800 dark:text-indigo-200">Available APIs</h2>
                </div>
                
                <nav className="p-4">
                  {filteredServices.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm p-2">No APIs found matching your search.</p>
                  ) : (
                    <div className="space-y-5">
                      {sortedCategories.map(category => (
                        <div key={category}>
                          <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2 tracking-wider">
                            {category}
                          </h3>
                          <ul className="space-y-1">
                            {servicesByCategory[category].map(service => (
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
                        </div>
                      ))}
                    </div>
                  )}
                </nav>
              </div>
              
              {/* API Count */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{services.length}</span> APIs available
                </p>
              </div>
            </div>

            {/* Main content - API Documentation */}
            {selectedService && (
              <div className="w-full lg:w-3/4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  {/* Service header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/20">
                    <div className="flex items-center justify-between">
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
                      <a 
                        href={selectedService.example.request} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Test API
                        <svg className="ml-1.5 -mr-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Navigation tabs */}
                  <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex -mb-px">
                      <button
                        onClick={() => setSelectedTab('overview')}
                        className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none ${
                          selectedTab === 'overview'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setSelectedTab('endpoints')}
                        className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none ${
                          selectedTab === 'endpoints'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        Endpoints
                      </button>
                      <button
                        onClick={() => setSelectedTab('parameters')}
                        className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none ${
                          selectedTab === 'parameters'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        Parameters
                      </button>
                      <button
                        onClick={() => setSelectedTab('examples')}
                        className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none ${
                          selectedTab === 'examples'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        Examples
                      </button>
                      <button
                        onClick={() => setSelectedTab('code')}
                        className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none ${
                          selectedTab === 'code'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        Code
                      </button>
                    </nav>
                  </div>

                  {/* Service content */}
                  <div className="p-6">
                    {/* Overview Tab */}
                    {selectedTab === 'overview' && (
                      <>
                        <section className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Description</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {selectedService.longDescription || selectedService.description}
                          </p>
                        </section>

                        <section className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Base URL</h3>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                            <code className="text-indigo-600 dark:text-indigo-300">https://freeapi.app/api/services/{selectedService.id}</code>
                          </div>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            All endpoints are relative to this base URL. No authentication is required.
                          </p>
                        </section>

                        <section className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Features</h3>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>No authentication required</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>CORS enabled for cross-domain requests</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>JSON responses with consistent formats</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Comprehensive error handling</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Free to use for development and production</span>
                            </li>
                          </ul>
                        </section>

                        <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
                          <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Quick Start</h3>
                          <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                            Try out this API with a simple GET request:
                          </p>
                          <div className="bg-white dark:bg-gray-800 rounded-md p-4 font-mono text-sm mb-4 overflow-x-auto">
                            <code className="text-gray-800 dark:text-gray-200">{selectedService.example.request}</code>
                          </div>
                          <a 
                            href={selectedService.example.request} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Try it now
                            <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </section>
                      </>
                    )}

                    {/* Endpoints Tab */}
                    {selectedTab === 'endpoints' && (
                      <section>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Available Endpoints</h3>
                        <div className="space-y-6">
                          {selectedService.endpoints.map((endpoint, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 flex items-center">
                                <span className={`px-2.5 py-1 rounded text-xs font-bold ${getMethodBadgeClass(endpoint.method)}`}>
                                  {endpoint.method}
                                </span>
                                <div className="ml-3 font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                                  {endpoint.path}
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-gray-600 dark:text-gray-300 mb-3">
                                  {endpoint.description}
                                </p>
                                <button 
                                  onClick={() => {
                                    setSelectedTab('code');
                                    // Select the first code example
                                    setActiveCodeTab(visibleLanguages[0]);
                                  }}
                                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                                >
                                  See code example →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Parameters Tab */}
                    {selectedTab === 'parameters' && (
                      <section>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Request Parameters</h3>
                        
                        {selectedService.parameters && selectedService.parameters.length > 0 ? (
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
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No parameters required for this API.</p>
                        )}
                        
                        {/* Request Body */}
                        {selectedService.requestBody && (
                          <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Request Body</h3>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="text-sm text-gray-700 dark:text-gray-300">
                                <p className="mb-4">Type: <span className="font-semibold">{selectedService.requestBody.type}</span></p>
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Properties</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {Object.entries(selectedService.requestBody.properties).map(([propName, propData], index) => (
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
                      </section>
                    )}

                    {/* Examples Tab */}
                    {selectedTab === 'examples' && (
                      <section>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Request & Response Examples</h3>
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm mb-6">
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                            <h4 className="font-medium text-gray-800 dark:text-white">Request</h4>
                          </div>
                          <div className="p-4">
                            <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                              <pre className="whitespace-pre">GET {selectedService.example.request}</pre>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                            <h4 className="font-medium text-gray-800 dark:text-white">Response</h4>
                          </div>
                          <div className="p-4">
                            <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                              <pre className="whitespace-pre">{JSON.stringify(selectedService.example.response, null, 2)}</pre>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 p-5 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Note</h4>
                              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                                <p>
                                  All responses include appropriate HTTP status codes:
                                </p>
                                <ul className="list-disc list-inside mt-1">
                                  <li>200: Success</li>
                                  <li>400: Bad Request</li>
                                  <li>404: Not Found</li>
                                  <li>500: Server Error</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Code Examples Tab */}
                    {selectedTab === 'code' && (
                      <section>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Code Examples</h3>
                        
                        {/* Programming language tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                          <nav className="-mb-px flex space-x-4 overflow-x-auto">
                            {visibleLanguages.map(language => (
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
                                  selectedService.endpoints[0],
                                  activeCodeTab,
                                  selectedService
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
                                selectedService.endpoints[0],
                                activeCodeTab,
                                selectedService
                              )}</pre>
                            </div>
                          </div>
                        </div>
                        
                        {/* Additional language selector */}
                        <div className="mt-6 flex justify-center">
                          <div className="inline-flex shadow-sm rounded-md">
                            <button
                              onClick={() => {
                                // Add a language that's not already visible
                                const allLanguages = ['javascript', 'python', 'curl', 'node', 'php'];
                                const nextLanguage = allLanguages.find(lang => !visibleLanguages.includes(lang));
                                if (nextLanguage) {
                                  setVisibleLanguages([...visibleLanguages, nextLanguage]);
                                  setActiveCodeTab(nextLanguage);
                                }
                              }}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                              disabled={visibleLanguages.length >= 5}
                            >
                              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Add Language
                            </button>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
                </div>
                
                {/* Additional resources */}
                <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Ready to build your application?</h3>
                  <p className="opacity-90 mb-4">
                    Integrate this API into your application now. No authentication required.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={`/api/services/${selectedService.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50"
                    >
                      View Raw API
                    </a>
                    <a 
                      href="/api-services" 
                      className="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-md text-white hover:bg-white/10"
                    >
                      Browse All APIs
                    </a>
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