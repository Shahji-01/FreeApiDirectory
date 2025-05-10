import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function ApiServicesPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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
        
        // Set active tab to hash service or first service if available
        if (hashService) {
          setActiveTab(hashService.id);
        } else if (sortedServices && sortedServices.length > 0) {
          setActiveTab(sortedServices[0].id);
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
        if (service) setActiveTab(service.id);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when active service changes
  useEffect(() => {
    if (activeTab) {
      window.location.hash = activeTab;
    }
  }, [activeTab]);

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Reset category filter when searching
    if (e.target.value) {
      setActiveCategory('all');
    }
  };

  // Extract all unique categories
  const categories = ['all', ...new Set(services.map(service => service.category))].sort();

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Find the active service
  const activeService = services.find(service => service.id === activeTab);

  // Function to get method badge color
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
      title="Our API Services - FreeAPI Directory"
      description="Explore and use our custom API services for your projects"
    >
      <Head>
        <title>Our API Services - FreeAPI Directory</title>
        <meta name="description" content="Explore and use our custom API services for your projects" />
      </Head>

      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-8 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Our API Services
        </h1>
        <p className="text-xl opacity-90 max-w-3xl mb-6">
          Explore our collection of custom-built API services that you can use freely in your projects. 
          Each service provides realistic data and functionality without requiring any API keys.
        </p>

        {/* Search bar */}
        <div className="max-w-md relative">
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
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error</h3>
              <div className="mt-2 text-base text-red-700 dark:text-red-300">
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 rounded-md hover:bg-red-200 dark:hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Category filter tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex overflow-x-auto pb-1 gap-x-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                    activeCategory === category
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No APIs found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service cards */}
              {filteredServices.map(service => (
                <div 
                  key={service.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-2 transition-all duration-200 ${
                    activeTab === service.id 
                      ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/30' 
                      : 'border-transparent hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{service.icon || '🔌'}</span>
                      <div>
                        <h2 className="font-bold text-gray-800 dark:text-white text-lg">{service.name}</h2>
                        <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <a
                          href={`/api/services/${service.id}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center"
                        >
                          Test API
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <Link
                          href={`/api-details/${service.id}`}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center"
                        >
                          Details
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                      <button
                        onClick={() => setActiveTab(service.id)}
                        className="text-sm px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Service details */}
          {activeService && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{activeService.icon || '🔌'}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{activeService.name}</h2>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {activeService.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/api-documentation#${activeService.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-indigo-300 dark:border-indigo-700 text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  >
                    Full Documentation
                    <svg className="ml-1.5 -mr-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-600 dark:text-gray-300">
                    {activeService.longDescription || activeService.description}
                  </p>
                </div>

                {/* Endpoints */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Available Endpoints
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
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
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Try
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {activeService.endpoints.map((endpoint, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getMethodBadgeClass(endpoint.method)}`}>
                                {endpoint.method}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 font-mono break-all">
                              {endpoint.path}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {endpoint.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Request Example
                    </h3>
                    <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto h-full">
                      <div className="flex items-center text-gray-400 mb-2 text-xs">
                        <span className="rounded bg-green-600 text-white px-2 py-1 mr-2">GET</span>
                        {activeService.example.request}
                      </div>
                      <div className="h-px bg-gray-700 my-3"></div>
                      <div className="text-gray-400 mb-1 text-xs">Headers:</div>
                      <pre className="text-gray-300 ml-2">{`{
  "Content-Type": "application/json"
}`}</pre>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Response Example
                    </h3>
                    <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto h-full">
                      <div className="flex items-center text-gray-400 mb-2 text-xs">
                        <span className="rounded bg-green-600 text-white px-2 py-1 mr-2">200</span>
                        OK
                      </div>
                      <div className="h-px bg-gray-700 my-3"></div>
                      <pre className="overflow-auto">{JSON.stringify(activeService.example.response, null, 2)}</pre>
                    </div>
                  </div>
                </div>

                {/* Try it out */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
                  <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Try It Out</h3>
                  <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                    This API is live and ready to use. You can make requests directly from your application 
                    or try it in your browser using the link below.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={activeService.example.request} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Test in Browser
                      <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    
                    <Link
                      href={`/api-documentation#${activeService.id}`}
                      className="inline-flex items-center px-4 py-2 border border-indigo-300 dark:border-indigo-700 text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Documentation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Integration guide */}
      <div className="mt-16">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl overflow-hidden">
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
                  <Link
                    href="/api-documentation"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    View Full Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Stats */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">API Statistics</h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Total APIs
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {services.length}
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Categories
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {categories.length - 1} {/* Subtract 1 for the 'all' category */}
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Endpoints
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {services.reduce((total, service) => total + service.endpoints.length, 0)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}