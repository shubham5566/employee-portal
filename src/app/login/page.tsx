"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { validateEmail, validateRequired } from "@/utils/validation";
import { ROUTES, VALID_CREDENTIALS } from "@/constants";

export default function LoginPage() {
  const { login, isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace(ROUTES.EMPLOYEES);
    }
  }, [isInitializing, isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const emailCheck = validateEmail(email);
    const passwordCheck = validateRequired(password, "Password");
    const nextErrors = {
      email: emailCheck.valid ? undefined : emailCheck.message,
      password: passwordCheck.valid ? undefined : passwordCheck.message,
    };
    setErrors(nextErrors);
    if (!emailCheck.valid || !passwordCheck.valid) return;

    setIsSubmitting(true);
    // Small delay so the loading state is perceptible, mirroring a real
    // network round-trip even though this check is local.
    await new Promise((resolve) => setTimeout(resolve, 250));
    const result = login({ email, password });
    setIsSubmitting(false);

    if (result.success) {
      router.push(ROUTES.EMPLOYEES);
    } else {
      setFormError(result.error ?? "Invalid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-lg font-semibold text-white">
            E
          </span>
          <h1 className="text-lg font-semibold text-slate-900">
            Employee Portal
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage your team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="admin@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          {formError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {formError}
            </p>
          )}

          <Button type="submit" isLoading={isSubmitting} className="mt-1 w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">
          Demo credentials: {VALID_CREDENTIALS.email} / {VALID_CREDENTIALS.password}
        </p>
      </div>
    </div>
  );
}
