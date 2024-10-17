// components/LoadingSpinner.tsx
const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="spinner-border border-dashed animate-[spin_2.5s_alternate_infinite] inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  
  export default LoadingSpinner;
  