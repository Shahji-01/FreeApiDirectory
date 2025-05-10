import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  const [apis, setApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteApiId, setDeleteApiId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const router = useRouter();

  useEffect(() => {
    fetchApis();

    // Check for success message in query params
    if (router.query.success) {
      setSuccessMessage(decodeURIComponent(router.query.success));
      // Clear success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
        router.replace('/admin', undefined, { shallow: true });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [router.query]);

  // Apply filtering when APIs or filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredApis(apis);
    } else {
      setFilteredApis(apis.filter(api => api.status === activeFilter));
    }
  }, [apis, activeFilter]);

  const fetchApis = async () => {
    setIsLoading(true);
    try {
      // Get admin token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }
      
      const res = await fetch('/api/apis', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          // Unauthorized - redirect to login
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to fetch APIs');
      }
      
      const data = await res.json();
      
      // Ensure all APIs have a status property
      const apisWithStatus = (data.apis || []).map(api => ({
        ...api,
        status: api.status || 'approved' // Default existing APIs to approved
      }));
      
      setApis(apisWithStatus);
      setFilteredApis(apisWithStatus);
    } catch (err) {
      console.error('Error fetching APIs:', err);
      setError('Failed to load APIs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (apiId) => {
    setDeleteApiId(apiId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteApiId(null);
  };

  const handleDelete = async () => {
    if (!deleteApiId) return;
    
    setIsDeleting(true);
    try {
      // Get admin token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }
      
      const res = await fetch(`/api/apis/${deleteApiId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          // Unauthorized - redirect to login
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to delete API');
      }
      
      // Update the list
      setApis(apis.filter(api => api.id !== deleteApiId));
      setSuccessMessage('API deleted successfully');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Error deleting API:', err);
      setError('Failed to delete API. Please try again.');
      
      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  const toggleFeatured = async (api) => {
    try {
      // Get admin token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }
      
      const updatedApi = { ...api, featured: !api.featured };
      
      const res = await fetch(`/api/apis/${api.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedApi),
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          // Unauthorized - redirect to login
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to update API');
      }
      
      // Update the local state
      setApis(apis.map(a => a.id === api.id ? { ...a, featured: !a.featured } : a));
      
      setSuccessMessage(`API ${updatedApi.featured ? 'featured' : 'unfeatured'} successfully`);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Error updating API:', err);
      setError('Failed to update API. Please try again.');
      
      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const updateApiStatus = async (api, newStatus) => {
    try {
      // Get admin token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }
      
      const updatedApi = { ...api, status: newStatus };
      
      const res = await fetch(`/api/apis/${api.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedApi),
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          // Unauthorized - redirect to login
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to update API status');
      }
      
      // Update the local state
      setApis(apis.map(a => a.id === api.id ? { ...a, status: newStatus } : a));
      
      setSuccessMessage(`API ${newStatus === 'approved' ? 'approved' : newStatus === 'rejected' ? 'rejected' : 'updated'} successfully`);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Error updating API status:', err);
      setError('Failed to update API status. Please try again.');
      
      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Get count of pending APIs
  const pendingCount = apis.filter(api => api.status === 'pending').length;

  return (
    <AdminLayout title="Admin Dashboard">
      <Head>
        <title>Admin Dashboard - FreeAPI Directory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl text-gray-700 dark:text-gray-300">
          Manage API Listings
          {pendingCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {pendingCount} pending
            </span>
          )}
        </h2>
        <Link href="/submit-api" legacyBehavior>
          <a className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            Add New API
          </a>
        </Link>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Filter tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeFilter === 'all'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              All
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                {apis.length}
              </span>
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeFilter === 'pending'
                  ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Pending
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                {apis.filter(api => api.status === 'pending').length}
              </span>
            </button>
            <button
              onClick={() => setActiveFilter('approved')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeFilter === 'approved'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Approved
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                {apis.filter(api => api.status === 'approved').length}
              </span>
            </button>
            <button
              onClick={() => setActiveFilter('rejected')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeFilter === 'rejected'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Rejected
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                {apis.filter(api => api.status === 'rejected').length}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    API
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Added Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Featured
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApis.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No APIs found
                    </td>
                  </tr>
                ) : (
                  filteredApis.map(api => (
                    <tr key={api.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      api.status === 'pending' ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
                    }`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-xl">
                            {api.icon || '🔌'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {api.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                              {api.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200">
                          {api.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(api.addedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {api.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateApiStatus(api, 'approved')}
                              className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-900/50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateApiStatus(api, 'rejected')}
                              className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-900/50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {api.status === 'approved' && (
                          <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                            Approved
                          </span>
                        )}
                        {api.status === 'rejected' && (
                          <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => toggleFeatured(api)}
                          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                            api.featured ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                          disabled={api.status !== 'approved'}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                              api.featured ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/api-details/${api.id}`} legacyBehavior>
                            <a 
                              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                              title="View"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </a>
                          </Link>
                          <Link href={`/admin/edit/${api.id}`} legacyBehavior>
                            <a 
                              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                              title="Edit"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </a>
                          </Link>
                          <button
                            onClick={() => openDeleteModal(api.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            title="Delete"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Delete API
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this API? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none disabled:opacity-50"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
