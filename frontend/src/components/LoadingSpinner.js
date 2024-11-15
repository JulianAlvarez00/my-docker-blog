function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-200 animate-pulse"></div>
        </div>
        <span className="ml-4 text-gray-600">Cargando...</span>
      </div>
    );
  }
  
  export default LoadingSpinner;