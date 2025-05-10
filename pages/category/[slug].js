import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ApiCard from '../../components/ApiCard';
import SearchBar from '../../components/SearchBar';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [category, setCategory] = useState(null);
  const [apis, setApis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        // Fetch category details
        const categoryRes = await fetch(`/api/categories`);
        
        if (!categoryRes.ok) {
          throw new Error('Failed to fetch category');
        }
        
        const categoryData = await categoryRes.json();
        const matchedCategory = categoryData.categories.find(cat => cat.name === slug);
        
        if (!matchedCategory) {
          throw new Error('Category not found');
        }
        
        setCategory(matchedCategory);
        
        // Fetch APIs in this category
        const apisRes = await fetch(`/api/apis?category=${slug}`);
        
        if (!apisRes.ok) {
          throw new Error('Failed to fetch APIs');
        }
        
        const apisData = await apisRes.json();
        setApis(apisData.apis || []);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/">
            <a className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Back to Home
            </a>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Category not found</h1>
          <Link href="/search">
            <a className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Browse All Categories
            </a>
          </Link>
        </div>
      </Layout>
    );
  }

  // Get category icon based on category name
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'development':
        return (
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'weather':
        return (
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'animals':
        return (
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'news':
        return (
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'jobs':
        return (
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'geo':
        return (
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        );
    }
  };

  return (
    <Layout
      title={`${category.label} APIs - FreeAPI Directory`}
      description={`Browse ${category.label} APIs: ${category.description}`}
    >
      <Head>
        <title>{category.label} APIs - FreeAPI Directory</title>
        <meta name="description" content={`Browse ${category.label} APIs: ${category.description}`} />
      </Head>

      <div className="mb-8">
        <Link href="/search">
          <a className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center mb-4">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all categories
          </a>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
                {category.label} APIs
                <span className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
                  {apis.length} APIs
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {category.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              {getCategoryIcon(category.name)}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar 
            className="max-w-3xl mx-auto"
            initialQuery={``}
            onSearch={(query) => router.push(`/search?q=${encodeURIComponent(query)}`)}
          />
        </div>

        {apis.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No APIs found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              There are no APIs in this category yet.
            </p>
            <Link href="/api/submit">
              <a className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Submit an API
              </a>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apis.map(api => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
        )}
      </div>

      {/* Related Categories */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Explore Other Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['development', 'weather', 'news', 'geo']
            .filter(cat => cat !== category.name)
            .map(cat => (
              <Link key={cat} href={`/category/${cat}`}>
                <a className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="font-medium text-gray-800 dark:text-white">{cat.charAt(0).toUpperCase() + cat.slice(1)}</div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
}
