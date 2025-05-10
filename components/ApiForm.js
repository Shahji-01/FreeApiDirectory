import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Default empty API object
const emptyApi = {
  name: '',
  description: '',
  category: '',
  auth: 'No',
  https: 'Yes',
  link: '',
  logo: ''
};

export default function ApiForm({ api = emptyApi, isEdit = false, onSubmit }) {
  const [formData, setFormData] = useState(api);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories) {
          setCategories(data.categories);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'API name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.link.trim()) {
      newErrors.link = 'API link is required';
    } else if (!formData.link.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
      newErrors.link = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        // Use the provided onSubmit handler (for admin panel)
        await onSubmit(formData);
      } else {
        // Submit to the API endpoint
        const response = await fetch('/api/apis' + (isEdit ? `/${formData.id}` : ''), {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit API');
        }
      }
      
      setSubmitSuccess(true);
      
      // Reset form if it's not an edit
      if (!isEdit) {
        setFormData(emptyApi);
      }
      
      // Redirect after successful edit
      if (isEdit) {
        router.push('/admin');
      }
      
    } catch (error) {
      console.error('Error submitting API:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to submit API. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {submitSuccess && !isEdit && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
          <p className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            API submitted successfully! Your submission will be reviewed by our team.
          </p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {isEdit ? 'Edit API' : 'Submit an API'}
      </h2>
      
      {errors.form && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg">
          <p>{errors.form}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* API Name */}
          <div className="col-span-1">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
              API Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              placeholder="E.g., Weather API"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          {/* Category */}
          <div className="col-span-1">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="category">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          
          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe what this API does and why it's useful..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          {/* API Link */}
          <div className="col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="link">
              API URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.link ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://api.example.com"
            />
            {errors.link && (
              <p className="mt-1 text-sm text-red-500">{errors.link}</p>
            )}
          </div>
          
          {/* Authentication Type */}
          <div className="col-span-1">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="auth">
              Authentication
            </label>
            <select
              id="auth"
              name="auth"
              value={formData.auth}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="No">No Authentication</option>
              <option value="apiKey">API Key</option>
              <option value="OAuth">OAuth</option>
              <option value="Bearer">Bearer Token</option>
              <option value="Basic">Basic Auth</option>
            </select>
          </div>
          
          {/* HTTPS Support */}
          <div className="col-span-1">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="https">
              HTTPS Support
            </label>
            <select
              id="https"
              name="https"
              value={formData.https}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
          {/* Logo URL (optional) */}
          <div className="col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="logo">
              Logo URL (optional)
            </label>
            <input
              type="url"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://example.com/logo.png"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              If left blank, a generic API logo will be used.
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          {isEdit && (
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 mr-4 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isEdit ? 'Update API' : 'Submit API'}
          </button>
        </div>
      </form>
    </div>
  );
}
