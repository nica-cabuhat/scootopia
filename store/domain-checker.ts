import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { DomainCategory, DomainResult } from "@/lib/domain-classifier";

type Counts = Record<DomainCategory, number>;

const zeroCounts = (): Counts => ({
  ok: 0,
  redirect: 0,
  error: 0,
  "network-error": 0,
});

type DomainCheckerState = {
  results: DomainResult[];
  isLoading: boolean;
  counts: Counts;
};

type DomainCheckerActions = {
  addResult: (result: DomainResult) => void;
  prependResults: (newResults: DomainResult[]) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
};

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const expiringStorage = {
  getItem: (key: string): string | null => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      const { value, expires } = JSON.parse(raw);
      if (Date.now() > expires) { localStorage.removeItem(key); return null; }
      return value;
    } catch { return null; }
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify({ value, expires: Date.now() + THIRTY_DAYS_MS }));
  },
  removeItem: (key: string) => localStorage.removeItem(key),
};

export const useDomainCheckerStore = create<DomainCheckerState & DomainCheckerActions>()(
  persist(
    (set) => ({
      results: [],
      isLoading: false,
      counts: zeroCounts(),

      addResult: (result) =>
        set((state) => ({
          results: [...state.results, result],
          counts: { ...state.counts, [result.category]: state.counts[result.category] + 1 },
        })),

      prependResults: (newResults) =>
        set((state) => {
          const newUrls = new Set(newResults.map((r) => r.url));
          const kept = state.results.filter((r) => !newUrls.has(r.url));
          const allResults = [...kept, ...newResults];
          const counts = zeroCounts();
          for (const r of allResults) counts[r.category] += 1;
          return { results: allResults, counts };
        }),

      setLoading: (isLoading) => set({ isLoading }),

      reset: () => set({ results: [], counts: zeroCounts(), isLoading: false }),
    }),
    {
      name: "domain-checker",
      storage: createJSONStorage(() => expiringStorage),
      partialize: (s) => ({ results: s.results, counts: s.counts }),
    },
  ),
);
