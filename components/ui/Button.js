export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) {
  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-300 text-white',
    success: 'bg-green-500 hover:bg-green-600 focus:ring-green-300 text-white',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-200',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
