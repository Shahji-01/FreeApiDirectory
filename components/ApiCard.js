import Link from 'next/link';
import { useState } from 'react';

export default function ApiCard({ api }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover-scale hover-shadow transition-all duration-300 animate-fade-in reveal-on-scroll border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              <Link 
                href={`/api-details/${api.id}`}
                className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {api.icon && <span className="mr-2 text-xl">{api.icon}</span>}
                {api.name}
              </Link>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {api.description}
            </p>
          </div>
          
          {/* API Type Badge */}
          <div className="ml-4 flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white animate-pulse-glow">
              {api.category === 'media' ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              )}
            </div>
          </div>
        </div>
        
        {/* API Stats Cards */}
        <div className="my-4 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-2 text-center transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
            <div className="font-semibold text-indigo-600 dark:text-indigo-400">{api.endpoints ? api.endpoints.length : 0}</div>
            <div className="text-gray-500 dark:text-gray-400">Endpoints</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-2 text-center transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
            <div className="font-semibold text-indigo-600 dark:text-indigo-400">
              {api.parameters ? api.parameters.length : 0}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Parameters</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-2 text-center transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
            <div className="font-semibold text-indigo-600 dark:text-indigo-400">
              {api.category === 'media' ? 'Advanced' : 'Standard'}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Type</div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link 
            href={`/category/${api.category}`}
            className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-100 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800/70 transition-colors"
          >
            {api.category}
          </Link>
          
          {api.auth && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
              Auth: {api.auth}
            </span>
          )}
          
          {api.https && (
            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-100 rounded-full">
              HTTPS: {api.https}
            </span>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          {api.addedAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Added: {new Date(api.addedAt).toLocaleDateString()}
            </span>
          )}
          
          <div className="flex space-x-3">
            {api.endpoints && api.endpoints[0] && (
              <a 
                href={api.endpoints[0].path} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Try API
              </a>
            )}
            
            <Link 
              href={`/api-details/${api.id}`}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium flex items-center transition-colors"
            >
              Details
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
