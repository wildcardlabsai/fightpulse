import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-muted">
        {icon ?? <Inbox className="h-12 w-12" />}
      </div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-xs text-muted">{description}</p>
      )}
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="mt-4 rounded-md bg-fp-red px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-fp-red-dark"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="mt-4 rounded-md bg-fp-red px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-fp-red-dark"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
