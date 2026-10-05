import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-fp-red" />
      <h3 className="text-sm font-bold text-white">{title}</h3>
      {message && (
        <p className="mt-1 max-w-sm text-xs text-muted">{message}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md border border-border bg-card px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-card-hover"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
