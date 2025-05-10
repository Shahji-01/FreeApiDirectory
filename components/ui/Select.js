import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  id,
  name,
  options = [],
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error = null,
  placeholder = 'Select an option',
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
      
      <select
        ref={ref}
        id={id || name}
        name={name}
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
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => {
          // Handle both string options and {value, label} objects
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
