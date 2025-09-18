// components/ui/loading.tsx
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  className?: string;
  text?: string;
}

export function Loading({ className = "", text }: LoadingProps) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
}