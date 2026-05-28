import { create } from "zustand";
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

export const useDomainCheckerStore = create<DomainCheckerState & DomainCheckerActions>((set) => ({
  results: [],
  isLoading: false,
  counts: zeroCounts(),

  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
      counts: {
        ...state.counts,
        [result.category]: state.counts[result.category] + 1,
      },
    })),

  prependResults: (newResults) =>
    set((state) => {
      const newUrls = new Set(newResults.map((r) => r.url));
      const kept = state.results.filter((r) => !newUrls.has(r.url));
      const allResults = [...newResults, ...kept];
      const counts = zeroCounts();
      for (const r of allResults) counts[r.category] += 1;
      return { results: allResults, counts };
    }),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () => set({ results: [], counts: zeroCounts(), isLoading: false }),
}));
