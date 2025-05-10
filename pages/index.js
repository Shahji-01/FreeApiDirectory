import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ApiCard from '../components/ApiCard';
import CategoryCard from '../components/CategoryCard';

export default function Home() {
  const [featuredApis, setFeaturedApis] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured APIs
        const apisRes = await fetch('/api/apis?featured=true');
        
        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        
        if (!apisRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const apisData = await apisRes.json();
        const categoriesData = await categoriesRes.json();
        
        setFeaturedApis(apisData.apis || []);
        setCategories(categoriesData.categories || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Function to render the illustration section
  const renderIllustrationSection = () => (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Use FreeAPI Directory?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find the perfect API for your next project from our curated collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Discover</h3>
            <p className="text-gray-600 dark:text-gray-300">Find APIs for any use case from our extensive collection</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Verified</h3>
            <p className="text-gray-600 dark:text-gray-300">All APIs are tested and verified by our team</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-300">Join thousands of developers using these APIs</p>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Save Time</h3>
            <p className="text-gray-600 dark:text-gray-300">Quickly integrate APIs into your projects</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      <Head>
        <title>FreeAPI Directory - Discover Free APIs for Your Projects</title>
        <meta name="description" content="Browse our curated collection of free and public APIs to integrate in your next project. Find APIs for weather, finance, development, entertainment and more." />
      </Head>

      <Hero />

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
        <>
          {/* Featured APIs */}
          <section className="py-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Featured APIs
              </h2>
              <Link 
                href="/search"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center"
              >
                View all
                <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApis.map(api => (
                <ApiCard key={api.id} api={api} />
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="py-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Browse by Category
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          </section>

          {/* Why Use FreeAPI Directory Section */}
          {renderIllustrationSection()}

          {/* Call to Action */}
          <section className="py-12">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 md:p-12 shadow-xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Have an API to Share?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  Help the developer community by submitting your API to our directory
                </p>
                <Link 
                  href="/api/submit"
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition duration-300 shadow-md"
                >
                  Submit Your API
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
