import { cn } from "@/lib/utils";

// components/LoadingSpinner.tsx
const LoadingSpinner: React.FC<{className?:string}> = ({className}) => {
    return (
      <div>
        <div className={"h-4 w-4 rounded-full border border-red-500 border-dashed animate-spin"} role="status"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  
  export default LoadingSpinner;
  