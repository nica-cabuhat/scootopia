import { toast } from "sonner";
import { useDomainCheckerStore } from "@/store/domain-checker";
import type { DomainResult } from "@/lib/domain-classifier";

export function useDomainChecker() {
  const { prependResults, setLoading } = useDomainCheckerStore();

  const run = async (urls: string[]): Promise<boolean> => {
    if (urls.length === 0) return false;

    setLoading(true);

    try {
      const res = await fetch("/api/check-domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });

      if (!res.body) return false;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      const resultMap = new Map<string, DomainResult>();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (line.trim()) {
            const result = JSON.parse(line) as DomainResult;
            resultMap.set(result.url, result);
          }
        }
      }

      const ordered = urls.flatMap((url) => {
        const r = resultMap.get(url);
        return r ? [r] : [];
      });
      prependResults(ordered);
      toast.success(`${ordered.length} domain${ordered.length !== 1 ? "s" : ""} checked.`);
      return true;
    } catch {
      toast.error("Something went wrong. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { run };
}
