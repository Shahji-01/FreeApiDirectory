import { useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import ApiForm from '../../components/ApiForm';

export default function SubmitApiPage() {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmissionSuccess = () => {
    setSubmissionSuccess(true);
    window.scrollTo(0, 0);
  };

  return (
    <Layout
      title="Submit an API - FreeAPI Directory"
      description="Submit your free or open API to our directory to help other developers discover it"
    >
      <Head>
        <title>Submit an API - FreeAPI Directory</title>
        <meta name="description" content="Submit your free or open API to our directory to help other developers discover it" />
      </Head>

      <div className="max-w-4xl mx-auto">
        {submissionSuccess ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Thank You for Your Submission!
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your API has been submitted successfully. Our team will review it shortly and add it to our directory.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSubmissionSuccess(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Another API
              </button>
              
              <a
                href="/"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Return to Home
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Submit an API
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Share a free or open API with the developer community
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Please only submit APIs that are free to use or have a significant free tier. All submissions will be reviewed before being published.
                  </p>
                </div>
              </div>
            </div>
            
            <ApiForm onSubmitSuccess={handleSubmissionSuccess} />
          </>
        )}
      </div>
    </Layout>
  );
}
