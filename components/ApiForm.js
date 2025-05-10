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
  logo: '',
  longDescription: '',
  endpoints: [{ method: 'GET', path: '', description: '', parameters: [] }],
  parameters: [],
  exampleResponse: '',
  submitterInfo: {
    name: '',
    email: '',
    website: ''
  }
};

// Method options for endpoints
const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export default function ApiForm({ api = emptyApi, isEdit = false, onSubmit }) {
  const [formData, setFormData] = useState(api);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('basic'); // 'basic', 'advanced', 'submitter'
  const [showEndpointSection, setShowEndpointSection] = useState(false);
  const [showParameterSection, setShowParameterSection] = useState(false);
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

  // Basic form field handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested properties for submitterInfo
    if (name.startsWith('submitter.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        submitterInfo: {
          ...prev.submitterInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle endpoint updates
  const handleEndpointChange = (index, field, value) => {
    const updatedEndpoints = [...formData.endpoints];
    updatedEndpoints[index] = {
      ...updatedEndpoints[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      endpoints: updatedEndpoints
    }));
  };

  // Handle parameter updates for an endpoint
  const handleParameterChange = (endpointIndex, paramIndex, field, value) => {
    const updatedEndpoints = [...formData.endpoints];
    const updatedParams = [...updatedEndpoints[endpointIndex].parameters];
    
    updatedParams[paramIndex] = {
      ...updatedParams[paramIndex],
      [field]: value
    };
    
    updatedEndpoints[endpointIndex] = {
      ...updatedEndpoints[endpointIndex],
      parameters: updatedParams
    };
    
    setFormData(prev => ({
      ...prev,
      endpoints: updatedEndpoints
    }));
  };

  // Handle global parameter updates
  const handleGlobalParameterChange = (index, field, value) => {
    const updatedParameters = [...formData.parameters];
    updatedParameters[index] = {
      ...updatedParameters[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      parameters: updatedParameters
    }));
  };

  // Add a new endpoint
  const addEndpoint = () => {
    setFormData(prev => ({
      ...prev,
      endpoints: [
        ...prev.endpoints,
        { method: 'GET', path: '', description: '', parameters: [] }
      ]
    }));
  };

  // Remove an endpoint
  const removeEndpoint = (index) => {
    setFormData(prev => ({
      ...prev,
      endpoints: prev.endpoints.filter((_, i) => i !== index)
    }));
  };

  // Add a parameter to an endpoint
  const addEndpointParameter = (endpointIndex) => {
    const updatedEndpoints = [...formData.endpoints];
    updatedEndpoints[endpointIndex].parameters.push({
      name: '',
      type: 'string',
      required: false,
      description: ''
    });
    
    setFormData(prev => ({
      ...prev,
      endpoints: updatedEndpoints
    }));
  };

  // Remove a parameter from an endpoint
  const removeEndpointParameter = (endpointIndex, paramIndex) => {
    const updatedEndpoints = [...formData.endpoints];
    updatedEndpoints[endpointIndex].parameters = updatedEndpoints[endpointIndex].parameters.filter((_, i) => i !== paramIndex);
    
    setFormData(prev => ({
      ...prev,
      endpoints: updatedEndpoints
    }));
  };

  // Add a global parameter
  const addGlobalParameter = () => {
    setFormData(prev => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        { name: '', type: 'string', required: false, description: '' }
      ]
    }));
  };

  // Remove a global parameter
  const removeGlobalParameter = (index) => {
    setFormData(prev => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
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
    
    // Advanced validation
    // Validate endpoints if any are provided
    if (formData.endpoints && formData.endpoints.length > 0) {
      formData.endpoints.forEach((endpoint, index) => {
        if (endpoint.path.trim() === '') {
          newErrors[`endpoint-${index}-path`] = 'Endpoint path is required';
        }
      });
    }
    
    // Submitter validation (only if submitter info is provided)
    if (formData.submitterInfo && formData.submitterInfo.email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.submitterInfo.email)) {
        newErrors['submitter.email'] = 'Please enter a valid email address';
      }
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
      // Add timestamp for new submissions
      const dataToSubmit = {
        ...formData,
        addedAt: formData.addedAt || new Date().toISOString()
      };
      
      if (onSubmit) {
        // Use the provided onSubmit handler (for admin panel)
        await onSubmit(dataToSubmit);
      } else {
        // Submit to the API endpoint
        const response = await fetch('/api/apis' + (isEdit ? `/${formData.id}` : ''), {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit),
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit API');
        }
      }
      
      setSubmitSuccess(true);
      
      // Reset form if it's not an edit
      if (!isEdit) {
        setFormData(emptyApi);
        setActiveSection('basic');
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
      
      {/* Form Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm ${
            activeSection === 'basic' 
              ? 'border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveSection('basic')}
        >
          Basic Info
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm ${
            activeSection === 'advanced' 
              ? 'border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveSection('advanced')}
        >
          Advanced Details
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm ${
            activeSection === 'submitter' 
              ? 'border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveSection('submitter')}
        >
          Your Info
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Info Section */}
        <div className={activeSection === 'basic' ? 'block' : 'hidden'}>
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
                placeholder="A brief description of what this API does (1-2 sentences)"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            
            {/* API Link */}
            <div className="col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="link">
                API Base URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="https://example.com/logo.png"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                If left blank, a generic API logo will be used.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <div></div> {/* Spacer */}
            <button
              type="button"
              onClick={() => setActiveSection('advanced')}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Next: API Details
            </button>
          </div>
        </div>
        
        {/* Advanced Info Section */}
        <div className={activeSection === 'advanced' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            {/* Long Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="longDescription">
                Detailed Description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Provide a comprehensive description of your API, its features, and how it can be used effectively..."
              />
            </div>
            
            {/* API Endpoints Section */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  API Endpoints
                </h3>
                <button
                  type="button"
                  onClick={() => setShowEndpointSection(!showEndpointSection)}
                  className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                >
                  {showEndpointSection ? 'Hide' : 'Show'} Endpoints
                  <svg 
                    className={`ml-1 h-4 w-4 transform ${showEndpointSection ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {showEndpointSection && (
                <div className="space-y-6">
                  {formData.endpoints.map((endpoint, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          Endpoint #{index + 1}
                        </h4>
                        {formData.endpoints.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEndpoint(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* HTTP Method */}
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">
                            HTTP Method
                          </label>
                          <select
                            value={endpoint.method}
                            onChange={(e) => handleEndpointChange(index, 'method', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                          >
                            {httpMethods.map(method => (
                              <option key={method} value={method}>{method}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Path */}
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">
                            Path
                          </label>
                          <input
                            type="text"
                            value={endpoint.path}
                            onChange={(e) => handleEndpointChange(index, 'path', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm ${
                              errors[`endpoint-${index}-path`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="/resource/{id}"
                          />
                          {errors[`endpoint-${index}-path`] && (
                            <p className="mt-1 text-xs text-red-500">{errors[`endpoint-${index}-path`]}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">
                          Description
                        </label>
                        <textarea
                          value={endpoint.description}
                          onChange={(e) => handleEndpointChange(index, 'description', e.target.value)}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                          placeholder="What does this endpoint do?"
                        />
                      </div>
                      
                      {/* Parameters */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                            Parameters
                          </label>
                          <button
                            type="button"
                            onClick={() => addEndpointParameter(index)}
                            className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800"
                          >
                            + Add Parameter
                          </button>
                        </div>
                        
                        {endpoint.parameters.length > 0 ? (
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <div key={paramIndex} className="p-3 grid grid-cols-5 gap-2 items-center">
                                <div className="col-span-1">
                                  <input
                                    type="text"
                                    value={param.name}
                                    onChange={(e) => handleParameterChange(index, paramIndex, 'name', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                                    placeholder="Name"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <select
                                    value={param.type}
                                    onChange={(e) => handleParameterChange(index, paramIndex, 'type', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                                  >
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="object">Object</option>
                                    <option value="array">Array</option>
                                  </select>
                                </div>
                                <div className="col-span-2">
                                  <input
                                    type="text"
                                    value={param.description}
                                    onChange={(e) => handleParameterChange(index, paramIndex, 'description', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                                    placeholder="Description"
                                  />
                                </div>
                                <div className="col-span-1 flex items-center justify-between">
                                  <label className="inline-flex items-center text-xs text-gray-700 dark:text-gray-300">
                                    <input
                                      type="checkbox"
                                      checked={param.required}
                                      onChange={(e) => handleParameterChange(index, paramIndex, 'required', e.target.checked)}
                                      className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-1">Required</span>
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => removeEndpointParameter(index, paramIndex)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No parameters defined for this endpoint.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addEndpoint}
                    className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Another Endpoint
                  </button>
                </div>
              )}
            </div>
            
            {/* Global Parameters Section */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Global Parameters
                </h3>
                <button
                  type="button"
                  onClick={() => setShowParameterSection(!showParameterSection)}
                  className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                >
                  {showParameterSection ? 'Hide' : 'Show'} Parameters
                  <svg 
                    className={`ml-1 h-4 w-4 transform ${showParameterSection ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {showParameterSection && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Define parameters that apply to all endpoints of your API.
                  </p>
                  
                  {formData.parameters.length > 0 ? (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 mb-4">
                      <div className="grid grid-cols-12 gap-2 bg-gray-50 dark:bg-gray-800 p-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                        <div className="col-span-2">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-6">Description</div>
                        <div className="col-span-2">Required</div>
                      </div>
                      
                      {formData.parameters.map((param, index) => (
                        <div key={index} className="p-3 grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-2">
                            <input
                              type="text"
                              value={param.name}
                              onChange={(e) => handleGlobalParameterChange(index, 'name', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                              placeholder="Name"
                            />
                          </div>
                          <div className="col-span-2">
                            <select
                              value={param.type}
                              onChange={(e) => handleGlobalParameterChange(index, 'type', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                            >
                              <option value="string">String</option>
                              <option value="number">Number</option>
                              <option value="boolean">Boolean</option>
                              <option value="object">Object</option>
                              <option value="array">Array</option>
                            </select>
                          </div>
                          <div className="col-span-6">
                            <input
                              type="text"
                              value={param.description}
                              onChange={(e) => handleGlobalParameterChange(index, 'description', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                              placeholder="Description"
                            />
                          </div>
                          <div className="col-span-1 flex items-center">
                            <input
                              type="checkbox"
                              checked={param.required}
                              onChange={(e) => handleGlobalParameterChange(index, 'required', e.target.checked)}
                              className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="ml-1 text-xs text-gray-700 dark:text-gray-300">Required</span>
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeGlobalParameter(index)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      No global parameters defined.
                    </p>
                  )}
                  
                  <button
                    type="button"
                    onClick={addGlobalParameter}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Global Parameter
                  </button>
                </div>
              )}
            </div>
            
            {/* Example Response */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="exampleResponse">
                Example Response (JSON)
              </label>
              <textarea
                id="exampleResponse"
                name="exampleResponse"
                value={formData.exampleResponse}
                onChange={handleChange}
                rows="5"
                className="font-mono text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder='{\n  "success": true,\n  "data": {\n    "id": 1,\n    "name": "Example",\n    "value": 42\n  }\n}'
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Provide a sample JSON response from your API.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveSection('basic')}
              className="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Previous: Basic Info
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('submitter')}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Next: Your Info
            </button>
          </div>
        </div>
        
        {/* Submitter Info Section */}
        <div className={activeSection === 'submitter' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-6">
              <p className="text-sm text-indigo-600 dark:text-indigo-300">
                This information is optional and will not be publicly displayed. It helps us contact you if we have questions about your API submission.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Submitter Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="submitterName">
                  Your Name
                </label>
                <input
                  type="text"
                  id="submitterName"
                  name="submitter.name"
                  value={formData.submitterInfo.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              
              {/* Submitter Email */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="submitterEmail">
                  Your Email
                </label>
                <input
                  type="email"
                  id="submitterEmail"
                  name="submitter.email"
                  value={formData.submitterInfo.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors['submitter.email'] ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="johndoe@example.com"
                />
                {errors['submitter.email'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['submitter.email']}</p>
                )}
              </div>
              
              {/* Submitter Website */}
              <div className="col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="submitterWebsite">
                  Your Website
                </label>
                <input
                  type="url"
                  id="submitterWebsite"
                  name="submitter.website"
                  value={formData.submitterInfo.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveSection('advanced')}
              className="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Previous: API Details
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
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
        </div>
      </form>
    </div>
  );
}
