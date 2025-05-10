export default function Card({
  children,
  className = '',
  hover = false,
  padding = true,
  ...props
}) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        shadow-md rounded-lg overflow-hidden
        ${padding ? 'p-6' : ''}
        ${hover ? 'transition-transform duration-300 hover:shadow-lg hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
