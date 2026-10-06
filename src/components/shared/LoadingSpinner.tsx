export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-24 ${className ?? ""}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" />
    </div>
  );
}
