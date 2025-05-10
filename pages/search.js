import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ApiCard from '../components/ApiCard';
import CategoryCard from '../components/CategoryCard';
import Fuse from 'fuse.js'; // Client-side fuzzy search

export default function SearchPage() {
  const router = useRouter();
  const { q: queryParam, category: categoryParam } = router.query;
  
  const [searchQuery, setSearchQuery] = useState(queryParam || '');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [apis, setApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fuse, setFuse] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  
  // Fetch APIs and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all APIs
        const apisRes = await fetch('/api/apis');
        
        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        
        if (!apisRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const apisData = await apisRes.json();
        const categoriesData = await categoriesRes.json();
        
        setApis(apisData.apis || []);
        setCategories(categoriesData.categories || []);
        
        // Initialize Fuse.js for fuzzy search
        const fuseInstance = new Fuse(apisData.apis || [], {
          keys: ['name', 'description', 'category'],
          threshold: 0.4,
          includeScore: true
        });
        
        setFuse(fuseInstance);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter APIs based on search query and selected category
  useEffect(() => {
    if (!apis.length) return;
    
    let results = [...apis];
    
    // Filter by category if selected
    if (selectedCategory) {
      results = results.filter(api => api.category === selectedCategory);
    }
    
    // Search by query if provided
    if (searchQuery && fuse) {
      const searchResults = fuse.search(searchQuery);
      results = searchResults.map(result => result.item);
    }
    
    setFilteredApis(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [apis, searchQuery, selectedCategory, fuse]);
  
  // Update URL params when search query or category changes
  useEffect(() => {
    if (!router.isReady) return;
    
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedCategory) params.append('category', selectedCategory);
    
    const newUrl = `/search${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl, undefined, { shallow: true });
    
  }, [searchQuery, selectedCategory, router.isReady]);
  
  // Update search query and selected category from URL params
  useEffect(() => {
    if (queryParam !== undefined) {
      setSearchQuery(queryParam || '');
    }
    
    if (categoryParam !== undefined) {
      setSelectedCategory(categoryParam || '');
    }
  }, [queryParam, categoryParam]);
  
  // Handle search submit
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  // Get current apis for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApis = filteredApis.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <Layout
      title="Search APIs - FreeAPI Directory"
      description="Search and browse free and open APIs for your next project"
    >
      <Head>
        <title>Search APIs - FreeAPI Directory</title>
        <meta name="description" content="Search and browse free and open APIs for your next project" />
      </Head>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          {searchQuery 
            ? `Search results for "${searchQuery}"` 
            : selectedCategory 
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} APIs` 
              : 'Browse APIs'}
        </h1>

        <div className="mb-8">
          <SearchBar 
            initialQuery={searchQuery} 
            onSearch={handleSearch}
          />
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories sidebar */}
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Categories
                </h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategorySelect('')}
                      className={`w-full text-left py-2 px-3 rounded-md ${
                        selectedCategory === ''
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category.name}>
                      <button
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left py-2 px-3 rounded-md flex justify-between items-center ${
                          selectedCategory === category.name
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full px-2 py-1">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Main content */}
            <div className="col-span-1 lg:col-span-3">
              {filteredApis.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                  <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No APIs found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {searchQuery 
                      ? `We couldn't find any APIs matching "${searchQuery}"`
                      : selectedCategory 
                        ? `No APIs found in the "${selectedCategory}" category`
                        : 'There are no APIs available at the moment'}
                  </p>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-4 text-gray-600 dark:text-gray-300">
                    Found {filteredApis.length} {filteredApis.length === 1 ? 'API' : 'APIs'}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentApis.map(api => (
                      <ApiCard key={api.id} api={api} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {filteredApis.length > itemsPerPage && (
                    <div className="mt-8 flex justify-center">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: Math.ceil(filteredApis.length / itemsPerPage) }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-1 rounded-md ${
                              currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => paginate(currentPage < Math.ceil(filteredApis.length / itemsPerPage) ? currentPage + 1 : currentPage)}
                          disabled={currentPage === Math.ceil(filteredApis.length / itemsPerPage)}
                          className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
