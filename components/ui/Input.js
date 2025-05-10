import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error = null,
  className = '',
  labelClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className={`block text-gray-700 dark:text-gray-300 mb-2 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 
          border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          dark:bg-gray-700 dark:border-gray-600 dark:text-white
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
