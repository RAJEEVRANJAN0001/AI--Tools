export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-dark-700 rounded-full animate-pulse"></div>
        
        {/* Inner spinning ring */}
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary-600 dark:border-t-primary-dark-400 rounded-full animate-spin"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-600 dark:bg-primary-dark-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      </div>
    </div>
  )
}
