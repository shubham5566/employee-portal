"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a production app this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <p className="text-lg font-semibold text-slate-900">
        Something went wrong
      </p>
      <p className="max-w-sm text-sm text-slate-500">
        An unexpected error occurred. You can try again below.
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
      >
        Try again
      </button>
    </div>
  );
}
