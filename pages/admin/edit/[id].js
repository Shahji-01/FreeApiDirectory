import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '../../../components/AdminLayout';
import ApiForm from '../../../components/ApiForm';

export default function EditApiPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [api, setApi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchApiDetails = async () => {
      try {
        const res = await fetch(`/api/apis/${id}`);
        
        if (!res.ok) {
          throw new Error('API not found');
        }
        
        const data = await res.json();
        setApi(data.api);
      } catch (err) {
        console.error('Error fetching API details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiDetails();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/apis/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error('Failed to update API');
      }
      
      // Redirect to admin page with success message
      router.push(`/admin?success=${encodeURIComponent('API updated successfully')}`);
    } catch (err) {
      console.error('Error updating API:', err);
      throw err;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Edit API">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !api) {
    return (
      <AdminLayout title="Edit API">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {error || 'API not found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The API you're trying to edit doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Admin
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit API: ${api.name}`}>
      <Head>
        <title>Edit API: {api.name} - FreeAPI Directory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center"
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Admin
        </button>
      </div>

      <ApiForm 
        api={api} 
        isEdit={true} 
        onSubmit={handleSubmit} 
      />
    </AdminLayout>
  );
}
