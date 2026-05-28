"use client";
import { useState } from "react";
import ResultItem from "@/components/domain-checker/result-item";
import { useDomainCheckerStore } from "@/store/domain-checker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE_OPTIONS = [20, 50, 100] as const;

const ResultsTable = () => {
  const results = useDomainCheckerStore((s) => s.results);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);

  if (results.length === 0) return null;

  const totalPages = Math.ceil(results.length / pageSize);
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const visible = results.slice(start, start + pageSize).reverse();

  const handlePageSize = (val: string) => {
    setPageSize(Number(val));
    setPage(1);
  };

  return (
    <div className="space-y-3">
      <ul className="w-full space-y-2">
        {visible.map((result, index) => (
          <ResultItem
            key={index}
            url={result.url}
            statusCode={result.category}
            status={result.status}
          />
        ))}
      </ul>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select value={String(pageSize)} onValueChange={handlePageSize}>
            <SelectTrigger className="w-20 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((n) => (
                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {start + 1}–{Math.min(start + pageSize, results.length)} of {results.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={safePage === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
