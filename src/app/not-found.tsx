import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <p className="text-5xl font-semibold text-primary-600">404</p>
      <h1 className="text-lg font-semibold text-slate-900">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
      >
        Go home
      </Link>
    </div>
  );
}
