import { useCallback, useEffect, useState } from "react";

/**
 * A useState-like hook backed by localStorage. Reads lazily on mount
 * (guarded for SSR, since Next.js renders this on the server first) and
 * writes through on every update.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // Ignore malformed storage and fall back to initialValue.
    } finally {
      setIsHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage may be unavailable (private mode, quota); fail silently.
        }
        return resolved;
      });
    },
    [key]
  );

  return { value, setValue: update, isHydrated };
}
